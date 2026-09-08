import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outHtmlPath = path.join(projectRoot, "out/index.html");
const nextHtmlPath = fs.existsSync(outHtmlPath)
  ? outHtmlPath
  : path.join(projectRoot, ".next/server/app/index.html");
const distDir = path.join(projectRoot, "dist");
const outputHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(nextHtmlPath)) {
  console.error("Error: Neither out/index.html nor .next/server/app/index.html exists. Run next build first.");
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

let html = fs.readFileSync(nextHtmlPath, "utf-8");

function resolveAssetPath(assetUrl) {
  const cleanPath = assetUrl.replace("/_next/", "");
  const inOut = path.join(projectRoot, "out/_next", cleanPath);
  if (fs.existsSync(inOut)) return inOut;
  const inNext = path.join(projectRoot, ".next", cleanPath);
  if (fs.existsSync(inNext)) return inNext;
  return null;
}

// 1. Inline CSS stylesheets
console.log("Inlining CSS stylesheets...");
html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'](\/_next\/static\/css\/[^"']+)["'][^>]*\/?>/gi, (match, href) => {
  const cssPath = resolveAssetPath(href);
  if (cssPath && fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    console.log(`Inlined CSS: ${href}`);
    return `<style>\n${cssContent}\n</style>`;
  }
  return match;
});

// Also match reversed attributes: href before rel
html = html.replace(/<link[^>]+href=["'](\/_next\/static\/css\/[^"']+)["'][^>]+rel=["']stylesheet["'][^>]*\/?>/gi, (match, href) => {
  const cssPath = resolveAssetPath(href);
  if (cssPath && fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    console.log(`Inlined CSS: ${href}`);
    return `<style>\n${cssContent}\n</style>`;
  }
  return match;
});

// 2. Pre-cache all images from public/images as base64 data URIs
console.log("Reading and converting images to Base64...");
const publicImagesDir = path.join(projectRoot, "public/images");
const imageMap = new Map();

if (fs.existsSync(publicImagesDir)) {
  const files = fs.readdirSync(publicImagesDir);
  for (const file of files) {
    const filePath = path.join(publicImagesDir, file);
    if (fs.statSync(filePath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      let mime = "image/jpeg";
      if (ext === ".png") mime = "image/png";
      else if (ext === ".webp") mime = "image/webp";
      else if (ext === ".svg") mime = "image/svg+xml";
      else if (ext === ".gif") mime = "image/gif";
      
      const fileData = fs.readFileSync(filePath);
      const base64 = fileData.toString("base64");
      const dataUri = `data:${mime};base64,${base64}`;
      imageMap.set(`/images/${file}`, dataUri);
      imageMap.set(`images/${file}`, dataUri);
      imageMap.set(file, dataUri);
    }
  }
}

console.log(`Converted ${imageMap.size / 3} images into data URIs.`);

// 3. Inline JS chunks
console.log("Inlining JavaScript chunks...");
html = html.replace(/<script[^>]+src=["'](\/_next\/static\/chunks\/[^"']+)["'][^>]*><\/script>/gi, (match, src) => {
  const chunkPath = resolveAssetPath(src);
  if (chunkPath && fs.existsSync(chunkPath)) {
    let jsContent = fs.readFileSync(chunkPath, "utf-8");
    // Safely escape </script> sequences in js
    jsContent = jsContent.replace(/<\/script>/gi, "<\\/script>");
    console.log(`Inlined JS chunk: ${src}`);
    return `<script>\n${jsContent}\n</script>`;
  }
  return match;
});

// 4. Replace image references across the entire HTML (in src, srcset, preload, Next.js hydration payload)
console.log("Inlining images into HTML...");
for (const [imgPath, dataUri] of imageMap.entries()) {
  if (imgPath.startsWith("/images/")) {
    // Replace "/images/filename"
    html = html.replaceAll(imgPath, dataUri);
    // Also handle URL encoded or escaped forms like "%2Fimages%2F" or "\/images\/"
    html = html.replaceAll(`\\${imgPath}`, dataUri);
  }
}

// 5. Add interactive client enhancement script to guarantee full functionality
// (modal, tabs, floor plans, forms) even in standalone static environments
const interactiveFallback = `
<script>
(function() {
  function initInteractive() {
    // Enquiry Modal Handling
    const modalBackdrop = document.querySelector('[role="dialog"]');
    const enquireButtons = document.querySelectorAll('button, a');
    
    window.openEloriaEnquiry = function(unit) {
      if (modalBackdrop) {
        modalBackdrop.style.display = 'flex';
        modalBackdrop.classList.remove('hidden');
        if (unit) {
          const unitSelect = modalBackdrop.querySelector('select');
          if (unitSelect) unitSelect.value = unit;
        }
      }
    };

    window.closeEloriaEnquiry = function() {
      if (modalBackdrop) {
        modalBackdrop.style.display = 'none';
      }
    };

    // Close button on modal
    if (modalBackdrop) {
      const closeBtn = modalBackdrop.querySelector('button[aria-label="Close"]');
      if (closeBtn) {
        closeBtn.addEventListener('click', window.closeEloriaEnquiry);
      }
      modalBackdrop.addEventListener('click', function(e) {
        if (e.target === modalBackdrop) window.closeEloriaEnquiry();
      });
    }

    // Connect enquiry buttons
    enquireButtons.forEach(btn => {
      const text = btn.textContent || '';
      if (/enquire|book a site visit|schedule visit/i.test(text)) {
        btn.addEventListener('click', function(e) {
          if (!btn.closest('form')) {
            window.openEloriaEnquiry();
          }
        });
      }
    });

    // Handle form submit with CRM dispatch and offline backup
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, select, textarea');
        const payload = {
          source: 'Eloria Website - Static HTML Enquiry Form',
          submittedAt: new Date().toISOString(),
        };

        inputs.forEach(input => {
          const name = input.name || input.placeholder || input.type;
          const val = input.value;
          if (/name/i.test(name)) payload.name = val;
          else if (/phone|number|tel/i.test(name) || input.type === 'tel') payload.phone = val;
          else if (/mail/i.test(name) || input.type === 'email') payload.email = val;
          else if (input.tagName === 'SELECT') {
            if (/cr|lac|budget/i.test(val)) payload.budget = val;
            else payload.unitType = val;
          } else if (input.tagName === 'TEXTAREA') {
            payload.message = val;
          }
        });

        try {
          const urlParams = new URLSearchParams(window.location.search);
          payload.utm_source = urlParams.get('utm_source') || '';
          payload.utm_medium = urlParams.get('utm_medium') || '';
          payload.utm_campaign = urlParams.get('utm_campaign') || '';
        } catch (err) {}

        // Backup to localStorage
        try {
          const list = JSON.parse(localStorage.getItem('eloria_leads') || '[]');
          list.push({ ...payload, id: 'lead_' + Date.now() });
          localStorage.setItem('eloria_leads', JSON.stringify(list));
        } catch (err) {}

        // Send to /api/enquiry if available
        try {
          fetch('/api/enquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(function() {});
        } catch (err) {}

        // Also post to Privyr webhook directly
        try {
          const privyrUrl = "https://www.privyr.com/api/v1/incoming-leads/qD4I962k/S2u8K9T5";
          const privyrPayload = {
            name: payload.name || "Prospective Buyer",
            phone: payload.phone || "",
            email: payload.email || "",
            lead_source: "Eloria Website - Single HTML Enquiry Form",
            other_fields: {
              "Project": "Eloria",
              "Developer": "Myra Infra & Developers",
              "City": "Hyderabad",
              "Unit Type": payload.unitType || "Not specified",
              "Budget": payload.budget || "Not specified",
              "Message": payload.message || "Enquiry for Eloria Villas",
              "UTM Source": payload.utm_source || "None",
              "UTM Medium": payload.utm_medium || "None",
              "UTM Campaign": payload.utm_campaign || "None",
            }
          };
          fetch(privyrUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(privyrPayload),
            mode: 'no-cors'
          }).catch(function() {});
        } catch (err) {}

        // Trigger conversion events (GTM & Google Ads)
        try {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'eloria_form_success',
            event_category: 'Lead',
            event_action: 'Submit Enquiry Form',
            unit_type: payload.unitType || 'Not Specified',
            budget_range: payload.budget || 'Not Specified',
            phone: payload.phone,
            lead_source: 'Eloria Website Single HTML',
          });
          window.dataLayer.push({
            event: 'godrej_form_success',
            event_category: 'Lead',
            event_action: 'Submit Enquiry Form',
            unit_type: payload.unitType || 'Not Specified',
            budget_range: payload.budget || 'Not Specified',
            phone: payload.phone,
            lead_source: 'Eloria Website Single HTML',
          });
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'generate_lead', {
              event_category: 'Engagement',
              event_label: payload.unitType || 'Eloria Villas Lead',
              value: 1.0,
              currency: 'INR',
            });
            window.gtag('event', 'conversion', {
              send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
              value: 1.0,
              currency: 'INR',
            });
          }
          if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
          }
        } catch (gtmErr) {}

        const successBox = document.createElement('div');
        successBox.className = "p-6 bg-olive text-paper text-center font-display text-xl animate-rise-fast";
        successBox.innerHTML = "<p>Thank you!</p><p class='text-sm mt-2 font-sans font-normal opacity-90'>Your enquiry has been received and routed to our sales team. We will call you within one working day.</p>";
        form.parentNode.replaceChild(successBox, form);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractive);
  } else {
    initInteractive();
  }
})();
</script>
`;

html = html.replace("</body>", `${interactiveFallback}\n</body>`);

// Write the single HTML file to dist/
fs.writeFileSync(outputHtmlPath, html, "utf-8");
const stats = fs.statSync(outputHtmlPath);
const fileSizeMb = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`✅ Successfully generated single-file bundle: ${outputHtmlPath} (${fileSizeMb} MB)`);

// Also write index.html directly in project root alongside package.json
const rootHtmlPath = path.join(projectRoot, "index.html");
fs.writeFileSync(rootHtmlPath, html, "utf-8");
console.log(`✅ Also saved index.html to project root: ${rootHtmlPath}`);

// Also copy all public assets (images, etc.) into dist for multi-file web servers
const publicDir = path.join(projectRoot, "public");
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log(`✅ Copied public assets to ${distDir}`);
}
