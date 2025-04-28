"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface ProductCardProps {
  name: string;
  price: number; // in cents
}

export const ProductCard = ({ name, price }: ProductCardProps) => {
  const handleBuy = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    const { sessionId } = await res.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="border p-4 rounded shadow-sm flex flex-col items-center">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-700">${(price / 100).toFixed(2)}</p>
      <button
        onClick={handleBuy}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Buy Now
      </button>
    </div>
  );
};
