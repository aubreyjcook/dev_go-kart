"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getRacePackage } from "@/lib/packages";
import { getStripe } from "@/lib/stripe";

export type CheckoutState = {
  error: string;
} | null;

const unavailable =
  "Checkout isn't available right now. Send us a message and we'll book you in.";

export async function startCheckout(
  _previous: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const racePackage = getRacePackage(String(formData.get("packageId")));
  if (!racePackage) return { error: "That session is no longer available." };

  const quantity = Number(formData.get("quantity"));
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return { error: "Choose between 1 and 20 drivers." };
  }

  const stripe = getStripe();
  if (!stripe) return { error: unavailable };

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const origin = headerList.get("origin") ?? (host ? `${proto}://${host}` : null);
  if (!origin) return { error: unavailable };

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: "eur",
            unit_amount: racePackage.unitAmount,
            product_data: {
              name: `${racePackage.name} — Apex Karting`,
              description: racePackage.duration,
            },
          },
        },
      ],
      metadata: {
        packageId: racePackage.id,
        packageName: racePackage.name,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });
  } catch (error) {
    console.error("Stripe checkout failed", error);
    return { error: "Could not start checkout. Please try again." };
  }

  if (!session.url) return { error: unavailable };
  redirect(session.url);
}
