"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/redux/cartSlice";
import { useState } from "react";
import { createOrder } from "@/lib/firestoreOrders";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCheckCircle, FiShoppingBag, FiUser, FiPhone, FiMapPin } from "react-icons/fi";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
  notes: ""  // 👈 add this
});


  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = totalPrice > 0 && totalPrice < 3000 ? 200 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in name, phone and address.");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customer: form,
      subtotal: totalPrice,
      deliveryFee,
      total: finalTotal,
      status: "pending",
      createdAt: new Date().toISOString(),
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor || null,
        selectedSize: item.selectedSize || null,
        media: item.media || [],
      })),
    };

    try {
      await createOrder(orderData);
      dispatch(clearCart());
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing your order.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form (scrollable on tall screens) */}
        <section
          className="lg:col-span-8 bg-white border border-gray-100 rounded-sm  p-5 sm:p-6 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4">
            <FiShoppingBag className="text-gray-600 w-5 h-5" />
            <h1 className="text-base font-semibold text-gray-900">Checkout</h1>
          </div>

          <div
            className="space-y-6 pr-2"
            style={{ scrollbarGutter: "stable" }}
          >
            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs text-gray-600">
                Full name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Your full name"
                />
              </label>

              <label className="text-xs text-gray-600">
                Phone *
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="+92 3XX XXXXXXX"
                  type="tel"
                />
              </label>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs text-gray-600">
                Address *
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Street address, building, etc."
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="text-xs text-gray-600">
                City
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </label>

              <label className="text-xs text-gray-600">
                Postcode
                <input
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </label>

              <div className="hidden sm:block" />
            </div>

            {/* Optional notes */}
            <div>
              <label className="text-xs text-gray-600">Order notes (optional)</label>
              <textarea
                name="notes"
                onChange={(e) => setForm({ ...form, ["notes"]: e.target.value })}
                className="mt-1 w-full text-sm border rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                rows={3}
                placeholder="Any delivery instructions?"
              />
            </div>

            {/* Small CTA area */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded">
                <FiUser className="text-gray-700 w-4 h-4" />
              </div>
              <div className="text-sm text-gray-700">
                <div className="font-medium">Quick tip</div>
                <div className="text-xs text-gray-500">Fill address correctly to avoid delivery delays</div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Sticky order slip */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-20 bg-white border border-gray-100 rounded-sm  p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Your order</h3>
              <div className="text-xs text-gray-500">Summary</div>
            </div>

            <div className="divide-y divide-gray-100">
  <div className="space-y-4 pb-4">
    {cartItems.length === 0 ? (
      <div className="text-xs text-gray-500">No items in cart</div>
    ) : (
      cartItems.map((it: any) => (
        <div
          key={`${it.id}-${it.selectedColor || "noColor"}-${it.selectedSize || "noSize"}`}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
        >
          {/* Left: Image + Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-14 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img
                src={it.media?.[0]?.url || "/placeholder.png"}
                alt={it.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
  <p className="text-sm font-medium text-gray-900 break-words">
    {it.title}
  </p>
  <p className="text-xs text-gray-500">
    Color: {it.selectedColor} | Size: {it.selectedSize}
  </p>
</div>

          </div>

          {/* Right: Price + Qty */}
          <div className="flex sm:flex-col   justify-between gap-1 sm:gap-0 text-sm text-gray-800">
            <span className="font-medium">
              PKR {(it.price * it.quantity).toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">x{it.quantity}</span>
          </div>
        </div>

                  ))
                )}
              </div>

              <div className="pt-4 pb-1 px-0 text-sm text-gray-700 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">PKR {totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Delivery</span>
                  <span className={`text-sm ${deliveryFee === 0 ? "text-green-600" : "text-gray-800"}`}>
                    {deliveryFee === 0 ? "Free" : `PKR ${deliveryFee}`}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                  <div>
                    <div className="text-xs text-gray-500">Total</div>
                    <div className="text-lg font-semibold text-gray-900">PKR {finalTotal.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.995 }}
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`mt-5 w-full rounded-xs py-3 text-sm font-medium text-white transition ${
                isSubmitting ? "bg-gray-400" : "bg-black"
              }`}
            >
              {isSubmitting ? "Placing order..." : "Place Order (COD)"}
            </motion.button>

            <div className="mt-3 text-center text-xs text-gray-500">
              By placing order you agree to our <u>Terms</u>.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
