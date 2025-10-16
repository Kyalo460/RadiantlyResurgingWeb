"use client";

import { useState } from "react";
import PayPalButton from "@/components/PayPalButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function StorePaymentModal({
  cart,
  isOpen,
  onClose,
  onClearCart
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePaymentSuccess = details => {
    setIsProcessing(false);
    setPaymentSuccess(true);
    setPaymentDetails(details);

    // Here you would typically:
    // 1. Send order confirmation to your backend
    // 2. Create order record
    // 3. Send confirmation email
    // 4. Handle digital product delivery

    console.log("Order payment successful:", details);

    // Simulate backend call and digital delivery
    setTimeout(() => {
      alert(
        "Order confirmed! You'll receive download links via email shortly."
      );
      onClearCart();
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
            Order Confirmed!
          </h3>
          <p className="mb-6 text-gray-700">
            Thank you for your purchase! You'll receive download links
            and order confirmation via email shortly.
          </p>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Transaction ID:</strong>{" "}
              {paymentDetails?.paymentID}
            </p>
            <p>
              <strong>Total:</strong> ${getTotalPrice()}
            </p>
            <p>
              <strong>Items:</strong> {getTotalItems()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#011627]">
            Complete Your Order
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isProcessing}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6 rounded-lg bg-gradient-to-br from-[#fdfffc] to-[#FFACC5] p-6">
          <h4 className="mb-4 text-xl font-bold text-[#011627]">
            Order Summary
          </h4>
          <div className="space-y-3">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[#011627]">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-[#011627]">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#FF87AB] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#011627]">
                Total:
              </span>
              <span className="text-xl font-bold text-[#011627]">
                ${getTotalPrice()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Digital Delivery Note */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            📧 <strong>Digital Delivery:</strong> After payment,
            you'll receive download links via email within 5 minutes.
            Books are available in PDF and EPUB formats.
          </p>
        </div>

        {/* PayPal Payment */}
        <div className="mb-4">
          <h5 className="mb-3 font-semibold text-[#011627]">
            Choose Payment Method:
          </h5>
          <PayPalButton
            amount={getTotalPrice()}
            description={`Radiantly Resurging Store - ${getTotalItems()} item(s)`}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
            customData={{
              cart: cart,
              totalItems: getTotalItems(),
              orderType: "store"
            }}
            style={{
              color: "gold",
              shape: "rect",
              label: "pay",
              height: 50
            }}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-3">
          <p className="text-center text-xs text-gray-600">
            Secure payment powered by PayPal. Digital products will be
            delivered instantly. By proceeding, you agree to our terms
            of service.
          </p>
        </div>
      </div>
    </div>
  );
}
