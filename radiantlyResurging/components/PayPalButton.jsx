"use client";

import {
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalButton({
  amount,
  description,
  onSuccess,
  onError,
  onCancel,
  customData = {},
  style = {}
}) {
  const [{ isPending, isResolved, isRejected }] =
    usePayPalScriptReducer();
  const [paymentError, setPaymentError] = useState(null);

  const defaultStyle = {
    layout: "vertical",
    color: "gold",
    shape: "rect",
    label: "paypal",
    height: 50,
    ...style
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD"
          },
          description:
            description || "Purchase from Radiantly Resurging"
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING" // For digital products/services
      }
    });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(details => {
        const paymentDetails = {
          orderID: data.orderID,
          paymentID: details.id,
          payerID: details.payer.payer_id,
          amount: amount,
          status: details.status,
          payer: details.payer,
          customData: customData
        };

        if (onSuccess) {
          onSuccess(paymentDetails);
        }
      })
      .catch(error => {
        console.error("PayPal capture error:", error);
        setPaymentError("Payment capture failed. Please try again.");
        if (onError) {
          onError(error);
        }
      });
  };

  const onErrorHandler = error => {
    console.error("PayPal error:", error);
    setPaymentError("Payment failed. Please try again.");
    if (onError) {
      onError(error);
    }
  };

  const onCancelHandler = data => {
    console.log("PayPal payment cancelled:", data);
    if (onCancel) {
      onCancel(data);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFACC5] border-t-[#FF87AB]"></div>
        <span className="ml-3 text-gray-600">Loading PayPal...</span>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="mb-2 font-semibold text-red-700">
          PayPal Failed to Load
        </p>
        <p className="mb-4 text-sm text-red-600">
          Please check your internet connection or try refreshing the
          page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Refresh Page
        </button>
      </div>
    );
  }

  if (!isResolved) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
        <p className="text-yellow-700">
          Initializing payment system...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {paymentError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{paymentError}</p>
          <button
            onClick={() => setPaymentError(null)}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800">
            Dismiss
          </button>
        </div>
      )}

      <PayPalButtons
        style={defaultStyle}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onErrorHandler}
        onCancel={onCancelHandler}
        forceReRender={[amount, description]}
      />
    </div>
  );
}
