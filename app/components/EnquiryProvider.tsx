"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import EnquiryModal from "./EnquiryModal";

type EnquiryContextValue = {
  open: (prefill?: { unitType?: string }) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return ctx;
}

export default function EnquiryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [prefillUnit, setPrefillUnit] = useState<string | undefined>();

  const open = useCallback((prefill?: { unitType?: string }) => {
    setPrefillUnit(prefill?.unitType);
    setSent(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const markSent = useCallback(() => setSent(true), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal
        isOpen={isOpen}
        sent={sent}
        prefillUnit={prefillUnit}
        onClose={close}
        onSubmitted={markSent}
      />
    </EnquiryContext.Provider>
  );
}
