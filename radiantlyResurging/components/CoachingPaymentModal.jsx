"use client";

import { useState } from "react";
import PayPalButton from "@/components/PayPalButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CoachingPaymentModal({
  selectedPlan,
  onClose,
  coachingPlans
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  if (!selectedPlan) return null;

  const plan = coachingPlans.find(p => p.id === selectedPlan);
  if (!plan) return null;

  const handlePaymentSuccess = details => {
    setIsProcessing(false);
    setPaymentSuccess(true);
    setPaymentDetails(details);

    // Here you would typically:
    // 1. Send payment confirmation to your backend
    // 2. Create user account/subscription
    // 3. Send confirmation email
    // 4. Redirect to success page

    console.log("Payment successful:", details);

    // Simulate backend call
    setTimeout(() => {
      alert(
        `Welcome to ${plan.name}! You'll receive a confirmation email shortly with next steps.`
      );
      onClose();
      setPaymentSuccess(false);
      setPaymentDetails(null);
    }, 3000);
  };

  const handlePaymentError = error => {
    setIsProcessing(false);
    console.error("Payment error:", error);
  };

  const handlePaymentCancel = data => {
    setIsProcessing(false);
    console.log("Payment cancelled:", data);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">✅</span>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-[#011627]">
            Payment Successful!
          </h3>
          <p className="mb-6 text-gray-700">
            Welcome to {plan.name}! You'll receive a confirmation
            email shortly with instructions on how to access your
            coaching program.
          </p>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Transaction ID:</strong>{" "}
              {paymentDetails?.paymentID}
            </p>
            <p>
              <strong>Amount:</strong> ${plan.price}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#011627]">
            Complete Your Purchase
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isProcessing}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="mb-6 rounded-lg bg-gradient-to-br from-[#fdfffc] to-[#FFACC5] p-6">
          <h4 className="mb-2 text-xl font-bold text-[#011627]">
            {plan.name}
          </h4>
          <p className="mb-4 text-sm text-gray-700">
            {plan.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#011627]">
              ${plan.price}
            </span>
            <span className="text-gray-700">
              per {plan.duration.replace("per ", "")}
            </span>
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-6">
          <h5 className="mb-3 font-semibold text-[#011627]">
            What's Included:
          </h5>
          <ul className="space-y-2 text-sm text-gray-700">
            {plan.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="mt-1 text-[#FF87AB]">•</span>
                <span>{feature}</span>
              </li>
            ))}
            {plan.features.length > 4 && (
              <li className="text-[#FF87AB]">
                + {plan.features.length - 4} more benefits
              </li>
            )}
          </ul>
        </div>

        {/* PayPal Payment */}
        <div className="mb-4">
          <h5 className="mb-3 font-semibold text-[#011627]">
            Choose Payment Method:
          </h5>
          <PayPalButton
            amount={plan.price}
            description={`${plan.name} - Radiantly Resurging Coaching`}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
            customData={{
              planId: plan.id,
              planName: plan.name,
              planType: "coaching"
            }}
            style={{
              color: "blue",
              shape: "rect",
              label: "subscribe",
              height: 50
            }}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-3">
          <p className="text-center text-xs text-gray-600">
            Secure payment powered by PayPal. You can cancel anytime.
            By proceeding, you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
