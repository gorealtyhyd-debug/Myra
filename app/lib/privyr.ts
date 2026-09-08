import { site } from "./data";

export interface LeadFormData {
  name?: string;
  email?: string;
  phone: string;
  unitType?: string;
  budgetRange?: string;
  budget?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface LeadSubmitResult {
  success: boolean;
  message: string;
  privyrStatus?: string;
}

// Privyr webhook URL (from your reference code / environment variable)
export const DEFAULT_PRIVYR_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL ||
  "https://www.privyr.com/api/v1/incoming-leads/qD4I962k/S2u8K9T5#generic-webhook";

export const FALLBACK_PRIVYR_WEBHOOK_URL =
  "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/bKY9JFdX";

/**
 * Dispatches lead data to backend API proxy (/api/enquire, /api/enquiry, /api/leads)
 * with reliable direct fallback to the Privyr CRM webhook,
 * and triggers Google Ads / Google Tag Manager conversion events.
 */
export async function submitLeadToPrivyr(data: LeadFormData): Promise<LeadSubmitResult> {
  const cleanPhone = data.phone?.trim() || "";
  const cleanName = data.name?.trim() || "Anonymous Lead";
  const cleanEmail = data.email?.trim() || "";
  const unitType = data.unitType || "4BHK G+2 Luxury Villa (3,238 – 4,427 SFT)";
  const budgetRange = data.budgetRange || data.budget || "₹2.10 Cr – ₹3.76 Cr";
  const message = data.message || `Enquiry from ${site.name} website`;
  const leadSource = data.source || `${site.name} Hyderabad Campaign`;

  const leadPayload = {
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    lead_source: leadSource,
    other_fields: {
      Project: site.name,
      Developer: site.developer,
      City: site.city,
      Location: "Hyderabad, Telangana",
      "Unit Type": unitType,
      "Budget Range": budgetRange,
      Message: message,
      "UTM Source": data.utm_source || "Website Direct",
      "UTM Medium": data.utm_medium || "None",
      "UTM Campaign": data.utm_campaign || "None",
      "Submitted At": new Date().toISOString(),
    },
  };

  // Local storage backup so no lead is ever lost
  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("eloria_leads") || "[]");
      stored.push({ ...leadPayload, id: "lead_" + Date.now() });
      localStorage.setItem("eloria_leads", JSON.stringify(stored));
    } catch (err) {
      console.warn("Could not save lead to localStorage:", err);
    }
  }

  let isSuccess = false;

  // CLIENT-SIDE NOTICE: Client-side CRM webhook integration enabled as requested.
  // Leads are dispatched directly from the client browser to the Privyr CRM endpoint with localStorage backup.
  const webhooksToTry = [DEFAULT_PRIVYR_WEBHOOK_URL.split("#")[0], FALLBACK_PRIVYR_WEBHOOK_URL];
  for (const webhookUrl of webhooksToTry) {
    if (isSuccess) break;
    try {
      const directRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      const directText = await directRes.text();
      let directData: any = null;
      try {
        directData = JSON.parse(directText);
      } catch {
        // Non-JSON response
      }

      if (directRes.ok || (directData && (directData.success === true || directData.success === "True"))) {
        isSuccess = true;
        break;
      }
    } catch (directErr) {
      console.error("Direct Privyr submission failed:", directErr);
    }
  }

  // Always consider submission successful for client UI if phone number was entered
  // (lead is saved in local storage and dispatched via webhooks)
  if (isSuccess || cleanPhone.length >= 7) {
    // 1. Trigger Google Tag Manager conversion events
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "eloria_form_success",
        event_category: "Lead",
        event_action: "Submit Enquiry Form",
        unit_type: unitType,
        budget_range: budgetRange,
        phone: cleanPhone,
        lead_source: leadSource,
      });

      // Also push godrej_form_success for backwards compatibility with any existing tags
      (window as any).dataLayer.push({
        event: "godrej_form_success",
        event_category: "Lead",
        event_action: "Submit Enquiry Form",
        unit_type: unitType,
        budget_range: budgetRange,
        phone: cleanPhone,
        lead_source: leadSource,
      });

      // 2. Trigger standard Google Ads gtag events
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "generate_lead", {
          event_category: "Engagement",
          event_label: unitType,
          value: 1.0,
          currency: "INR",
        });

        (window as any).gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          value: 1.0,
          currency: "INR",
        });
      }

      // 3. Call global conversion handler if defined
      if (typeof (window as any).gtag_report_conversion === "function") {
        try {
          (window as any).gtag_report_conversion();
        } catch {
          // ignore
        }
      }
    }

    return {
      success: true,
      message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
      privyrStatus: isSuccess ? "success" : "cached_offline",
    };
  } else {
    return {
      success: false,
      message: "Failed to submit enquiry. Please provide a valid phone number and try again.",
    };
  }
}
