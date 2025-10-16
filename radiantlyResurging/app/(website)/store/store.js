"use client";
import Image from "next/image";
import { useState } from "react";
import StorePaymentModal from "@/components/StorePaymentModal";

export default function Store() {
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const books = [
    {
      id: 1,
      title: "Rising from Ashes",
      author: "Mercy Munee",
      price: 24.99,
      image: "/img/books/book_1.jpg",
      description: "A powerful story of resilience and transformation"
    },
    {
      id: 2,
      title: "Radiant Beginnings",
      author: "Mercy Munee",
      price: 19.99,
      image: "/img/books/book_2.jpg",
      description: "Finding light in the darkest moments"
    },
    {
      id: 3,
      title: "The Phoenix Path",
      author: "Mercy Munee",
      price: 29.99,
      image: "/img/books/book_3.jpg",
      description: "A guide to personal reinvention"
    },
    {
      id: 4,
      title: "Emerging Stronger",
      author: "Mercy Munee",
      price: 22.99,
      image: "/img/books/book_4.jpg",
      description: "Overcoming life's greatest challenges"
    }
  ];

  const addToCart = book => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });

    // Show confirmation popup
    setAddedItem(book);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const removeFromCart = bookId => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      // Close cart modal and open payment modal
      setIsCheckoutOpen(false);
      setIsPaymentModalOpen(true);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#f5ebe0] dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#f5ebe0] to-[#f5ebe0] p-6 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-4xl font-bold text-[#011627] dark:text-white">
            Radiant Store
          </h1>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-pink-300 bg-white px-6 py-3 font-semibold text-[#4C0827] transition-colors hover:border-pink-400 hover:bg-pink-50 dark:border-pink-500 dark:bg-gray-800 dark:text-pink-300 dark:hover:bg-pink-900/20">
            Cart ({getTotalItems()}) - ${getTotalPrice()}
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map(book => (
            <div
              key={book.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:scale-105 hover:border-pink-300 hover:bg-pink-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-pink-900/10">
              <div className="relative h-64 w-full bg-gradient-to-br from-pink-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-[#011627] dark:text-white">
                  {book.title}
                </h3>
                <p className="mb-2 text-sm text-[#4C0827] dark:text-pink-300">
                  by {book.author}
                </p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#4C0827] dark:text-pink-300">
                    ${book.price}
                  </span>
                  <button
                    onClick={() => addToCart(book)}
                    className="rounded-lg border border-pink-300 bg-white px-4 py-2 font-semibold text-[#4C0827] transition-colors hover:border-pink-400 hover:bg-pink-50 dark:border-pink-500 dark:bg-gray-700 dark:text-pink-300 dark:hover:bg-pink-900/20">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Added to Cart Popup */}
      {showAddedToCart && addedItem && (
        <div className="fixed right-4 top-4 z-50 rounded-lg border border-green-300 bg-green-50 p-4 shadow-lg dark:border-green-600 dark:bg-green-900/20">
          <div className="flex items-center gap-3">
            <div className="text-green-600 dark:text-green-400">
              ✓
            </div>
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200">
                Added to Cart!
              </p>
              <p className="text-sm text-green-600 dark:text-green-300">
                {addedItem.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-gray-800">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#011627] dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-2xl text-gray-600 hover:text-[#011627] dark:text-gray-400 dark:hover:text-white">
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="py-8 text-center text-gray-600 dark:text-gray-400">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="mb-6 space-y-4">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#011627] dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="h-8 w-8 rounded-full bg-pink-200 text-[#4C0827] hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200 dark:hover:bg-pink-700">
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-[#011627] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="h-8 w-8 rounded-full bg-pink-200 text-[#4C0827] hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200 dark:hover:bg-pink-700">
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 dark:border-gray-600">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#011627] dark:text-white">
                        Total: ${getTotalPrice()}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full rounded-lg border border-pink-300 bg-white py-3 font-semibold text-[#4C0827] transition-colors hover:border-pink-400 hover:bg-pink-50 dark:border-pink-500 dark:bg-gray-700 dark:text-pink-300 dark:hover:bg-pink-900/20">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PayPal Payment Modal */}
      <StorePaymentModal
        cart={cart}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
