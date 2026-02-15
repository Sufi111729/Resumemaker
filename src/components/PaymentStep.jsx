import React from "react";

export default function PaymentStep({
  paid,
  onConfirmPaid,
  onToast,
  upiId,
  upiLink,
  amountLabel,
}) {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const [method, setMethod] = React.useState("upi");

  const handleOpenUpi = () => {
    if (!isMobile) {
      onToast("Use QR code to pay on desktop.");
      return;
    }
    window.location.href = upiLink;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      onToast("UPI ID copied.");
    } catch {
      onToast("Copy failed. Please copy manually.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-semibold">Unlock PDF for {amountLabel}</div>
        <div className="text-xs text-slate-500">
          Choose a payment method and complete the payment.
        </div>
      </div>

      <div className="payment-methods">
        <button
          type="button"
          onClick={() => setMethod("upi")}
          className={`payment-method ${
            method === "upi" ? "payment-method-active" : ""
          }`}
        >
          UPI App
        </button>
        <button
          type="button"
          onClick={() => setMethod("qr")}
          className={`payment-method ${
            method === "qr" ? "payment-method-active" : ""
          }`}
        >
          Scan QR
        </button>
      </div>

      {method === "upi" && (
        <div className="payment-card">
          <div>
            <div className="payment-title">Pay via UPI App</div>
            <div className="payment-sub">Fast payment on mobile.</div>
          </div>
          <button
            type="button"
            onClick={handleOpenUpi}
            className="payment-primary"
          >
            Open UPI App
          </button>
          {!isMobile && (
            <div className="payment-hint">Use QR code to pay.</div>
          )}
        </div>
      )}

      {method === "qr" && (
        <div className="payment-card">
          <div>
            <div className="payment-title">Scan QR & Pay</div>
            <div className="payment-sub">Use any UPI app to scan.</div>
          </div>
          <div className="payment-qr">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                upiLink
              )}`}
              alt="UPI QR"
              className="payment-qr-img"
            />
          </div>
          <div className="payment-upi">
            <span>{upiId}</span>
            <button type="button" onClick={handleCopy}>
              Copy UPI ID
            </button>
          </div>
        </div>
      )}

      <div className="payment-confirm">
        {paid ? (
          <div className="text-sm text-emerald-600 font-semibold">
            Payment marked successful
          </div>
        ) : (
          <ConfirmButton onConfirm={onConfirmPaid} />
        )}
      </div>
    </div>
  );
}

function ConfirmButton({ onConfirm }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="payment-secondary"
      >
        I Have Paid
      </button>
      {open && (
        <div className="payment-modal">
          <div className="payment-modal-card">
            <div className="text-sm font-semibold">
              Did you complete the 5 payment?
            </div>
            <div className="text-xs text-slate-500">
              This will unlock the download for 10 minutes.
            </div>
            <div className="payment-modal-actions">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="payment-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                className="payment-primary"
              >
                Yes, I paid
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
