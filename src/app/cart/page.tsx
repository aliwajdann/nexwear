"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import Link from "next/link";
import { Minus, Plus, Trash2, Clock } from "lucide-react";

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = subtotal < 3000 && subtotal > 0 ? 200 : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="px-4 md:px-6 py-8 max-w-5xl mx-auto text-center text-sm text-gray-600">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-gray-900">
      <div className="max-w-5xl md:max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Title */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-medium tracking-tight">Your bag</h1>
        </header>

        {/* Compact notice */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex items-center gap-2 text-xs text-yellow-800 bg-yellow-50 border border-yellow-100 rounded px-3 py-2">
            <Clock className="w-3 h-3" />
            <span>Someone placed an order on an item in your bag</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: products */}
          <div className="md:col-span-2 space-y-4">
            <section className="text-sm">
              {/* <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-medium">Your products</h2>
                <button className="text-xs underline text-gray-600 hover:text-gray-800">
                  Remove all items
                </button>
              </div> */}

              <div className="space-y-3">
                {items.map((item: any, idx: number) => {
                  const imageUrl =
                    item.media?.find((m: any) => m.type === "image")?.url ||
                    "/placeholder.png";

                  const colorKey =
                    typeof item.selectedColor === "object"
                      ? item.selectedColor?.colorCode ||
                        item.selectedColor?.colorName ||
                        JSON.stringify(item.selectedColor)
                      : item.selectedColor || "nocolor";

                  const key = `${item.id}-${item.selectedSize || "nosize"}-${colorKey}-${idx}`;

                  return (
                    <article
                      key={key}
                      className="flex items-start gap-4 p-3 md:p-4 bg-white border border-gray-200 rounded"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="md:flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium leading-tight truncate">
                              {item.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                              {item.selectedColor && (
                                <span>
                                  Color:{" "}
                                  <span className="font-semibold">
                                    {typeof item.selectedColor === "object"
                                      ? item.selectedColor.colorName ||
                                        item.selectedColor.colorCode
                                      : item.selectedColor}
                                  </span>
                                </span>
                              )}
                              {item.selectedSize && (
                                <span>
                                  Size:{" "}
                                  <span className="font-semibold">
                                    {item.selectedSize}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="md:text-right md:shrink-0">
                            <div className="text-sm font-semibold text-[#681C1C]">
                              Rs. {item.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Controls row */}
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          {/* Quantity stepper */}
                          <div className="flex items-center border rounded w-fit">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    selectedColor: item.selectedColor,
                                    selectedSize: item.selectedSize,
                                    quantity: Math.max(1, (item.quantity || 1) - 1),
                                  })
                                )
                              }
                              className="px-2 py-1 text-sm hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <div className="w-10 text-center text-xs">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    selectedColor: item.selectedColor,
                                    selectedSize: item.selectedSize,
                                    quantity: (item.quantity || 1) + 1,
                                  })
                                )
                              }
                              className="px-2 py-1 text-sm hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-xs font-medium">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </div>

                          {/* Remove */}
<button onClick={() => dispatch(removeFromCart(item.id))} className="flex items-center gap-1 text-gray-500 hover:text-[#681C1C]" aria-label="Remove item" > <Trash2 className="w-4 h-4" /> <span className="hidden md:inline text-xs">Remove</span> </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right: order summary */}
          <aside className="md:col-span-1">
            <div className="bg-[#fbf9f7] border border-[#ece7e3] p-4 md:p-5 text-sm rounded">
              <h4 className="text-sm font-medium mb-3">Order total</h4>

              <div className="text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items total</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Standard delivery total</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#efe9e6] flex items-center justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 mt-3">
                Free Standard Shipping over Rs. 3000
              </p>

              <Link href="/checkout" className="block">
                <button className="w-full mt-4 bg-[#3b3736] text-white py-2 text-sm font-medium rounded hover:opacity-95">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
