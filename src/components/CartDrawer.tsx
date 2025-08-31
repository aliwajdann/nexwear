"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { toggle } from "@/redux/drawerSlice";
import Link from "next/link";

export default function CartDrawer() {
  const isOn = useSelector((state: RootState) => state.toggle.value);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Money logic (PKR) ---
  const freeShippingThreshold = 3000;
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      ),
    [items]
  );
  const deliveryFee =
    subtotal > 0 && subtotal < freeShippingThreshold ? 200 : 0;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Helper to render color swatch / image / name
  const renderColor = (selectedColor: any) => {
    if (!selectedColor) return null;

    // object: { colorCode, colorName, image }
    if (typeof selectedColor === "object" && selectedColor !== null) {
      const { colorCode, colorName, image } = selectedColor as any;
      if (image) {
        return (
          <div className="flex items-center gap-2">
            <img
              src={image}
              alt={colorName || "color"}
              className="w-5 h-5 rounded object-cover border"
            />
            {colorName && <span className="text-xs text-neutral-600">{colorName}</span>}
          </div>
        );
      }
      if (colorCode) {
        return (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border" style={{ background: colorCode }} />
            {colorName && <span className="text-xs text-neutral-600">{colorName}</span>}
          </div>
        );
      }
      if (colorName) {
        return <span className="text-xs text-neutral-600">{colorName}</span>;
      }
    }

    // string: could be "#fff" or "Blue"
    if (typeof selectedColor === "string") {
      const s = selectedColor.trim();
      if (/^#([0-9A-F]{3}){1,2}$/i.test(s)) {
        return (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border" style={{ background: s }} />
            <span className="text-xs text-neutral-600">{s}</span>
          </div>
        );
      }
      // fallback: plain name
      return <span className="text-xs text-neutral-600">{s}</span>;
    }

    return null;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300
        ${isOn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => dispatch(toggle())}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col
        transform transition-transform duration-500
        ${isOn ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Cart drawer"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <h2 className="text-base font-medium text-neutral-900">
            Your bag{" "}
            <span className="text-xs text-neutral-500">
              ({mounted ? items.length : 0})
            </span>
          </h2>
          <button
            aria-label="Close cart"
            onClick={() => dispatch(toggle())}
            className="p-1 rounded hover:bg-neutral-100"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        <div className="flex gap-3 p-5 border-b items-center">
          <p className="p-2 bg-red-600 text-white text-xs">
            Add Rs.3000 to get Free Shipping
          </p>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!mounted ? (
            // don't render dynamic cart until client mount to avoid hydration mismatch
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 rounded w-24 animate-pulse" />
              <div className="h-6 bg-neutral-200 rounded w-32 animate-pulse" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-neutral-700 mt-16 text-sm">
              🛒 Your cart is empty
            </p>
          ) : (
            <div className="space-y-5">
              {items.map((item: any, idx: number) => {
                const imageUrl =
                  item.media?.find((m: any) => m.type === "image")?.url ||
                  // support both media as array of objects or strings
                  (Array.isArray(item.media) && typeof item.media[0] === "string"
                    ? item.media[0]
                    : "/placeholder.png");

                const colorKey =
                  typeof item.selectedColor === "object"
                    ? item.selectedColor?.colorCode || item.selectedColor?.colorName || JSON.stringify(item.selectedColor)
                    : item.selectedColor || "nocolor";

                const key = `${item.id}-${item.selectedSize || "nosize"}-${colorKey}-${idx}`;

                return (
                  <div
  key={key}
  className="flex gap-3 pb-5 border-b border-neutral-200"
>
  <img
    src={imageUrl}
    alt={item.title}
    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded border border-neutral-200"
  />

  <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-sm text-neutral-900 font-medium truncate">
        {item.title}
      </h3>
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="shrink-0 w-7 h-7 grid place-items-center rounded-full border border-neutral-300 hover:bg-neutral-100"
        aria-label="Remove item"
      >
        <X className="w-3.5 h-3.5 text-neutral-700" />
      </button>
    </div>

    {/* Color & Size under title */}
    <div className="flex items-center gap-3 mt-1">
      {renderColor(item.selectedColor)}
      {item.selectedSize && (
        <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-300">
          {item.selectedSize}
        </span>
      )}
    </div>

    {/* Price + quantity controls */}
    <div className="flex items-center justify-between mt-2">
      <p className="text-sm text-neutral-900 font-medium">
        Rs.{(item.price || 0).toFixed(0)}
      </p>

      <div className="inline-flex items-center border border-neutral-300 rounded">
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
          className="px-2 py-1 text-neutral-700 hover:bg-neutral-100 text-sm"
        >
          −
        </button>
        <span className="px-3 py-1 text-sm text-neutral-900">
          {item.quantity}
        </span>
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
          className="px-2 py-1 text-neutral-700 hover:bg-neutral-100 text-sm"
        >
          +
        </button>
      </div>
    </div>
  </div>
</div>
  );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pt-2 pb-4 border-t border-neutral-200">
         <p className="text-xs text-neutral-700 mb-2">
  {!mounted ? (
    // skeleton placeholder on server render
    "Loading shipping info..."
  ) : remainingForFree > 0 ? (
    `Add Rs.${remainingForFree.toFixed(0)} to get Free Standard Shipping`
  ) : (
    "You’ve unlocked Free Shipping 🎉"
  )}
</p>

          <div className="h-1 w-full bg-neutral-200 rounded overflow-hidden mb-3">
            <div
              className="h-1 bg-neutral-900"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* subtotal / delivery / total */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-medium">Rs.{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-neutral-600">Delivery</span>
            <span className="font-medium">
              {deliveryFee === 0 ? "Free" : `Rs.${deliveryFee.toFixed(0)}`}
            </span>
          </div>

          <Link href="/checkout" onClick={() => dispatch(toggle())}>
            <button className="w-full bg-neutral-900 text-white py-3 rounded text-sm">
              Rs.{total.toFixed(0)} – Checkout
            </button>
          </Link>
          <Link
            href="/cart"
            onClick={() => dispatch(toggle())}
            className="block text-center text-sm text-neutral-800 mt-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50"
          >
            Go to bag
          </Link>
        </div>
      </aside>
    </>
  );
}
