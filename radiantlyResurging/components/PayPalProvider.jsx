"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  components: "buttons,marks,funding-eligibility",
  "enable-funding": "venmo",
  "disable-funding": "card",
  "data-sdk-integration-source": "button-factory"
};

export default function PayPalProvider({ children }) {
  // Check if PayPal Client ID is configured
  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    console.error(
      "PayPal Client ID is not configured in environment variables!"
    );
    return (
      <div className="flex items-center justify-center p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="font-medium text-red-700">
            Payment system not configured
          </p>
          <p className="mt-1 text-sm text-red-600">
            PayPal Client ID missing
          </p>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  );
}
