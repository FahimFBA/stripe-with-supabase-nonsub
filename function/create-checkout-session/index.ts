// functions/create-checkout-session/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";

serve(async (req) => {
  const { name, price } = await req.json();

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2022-11-15",
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name,
            },
            unit_amount: price, // price in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${Deno.env.get("SUCCESS_URL")}`,
      cancel_url: `${Deno.env.get("CANCEL_URL")}`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response("Error creating checkout session", { status: 500 });
  }
});
