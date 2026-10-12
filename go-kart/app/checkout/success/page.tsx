import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Your Apex Karting payment confirmation.",
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Suspense
        fallback={
          <p className="text-muted-foreground">Checking your payment…</p>
        }
      >
        <BookingReceipt searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function BookingReceipt({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;
  const stripe = getStripe();

  if (!stripe || !sessionId?.startsWith("cs_")) {
    return <PaymentMessage paid={false} />;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return <PaymentMessage paid={false} />;
    }

    const line = session.line_items?.data[0];
    const total =
      session.amount_total != null && session.currency
        ? formatMoney(session.amount_total, session.currency)
        : null;

    return (
      <PaymentMessage
        paid
        packageName={session.metadata?.packageName ?? line?.description}
        quantity={line?.quantity ?? undefined}
        total={total}
        email={session.customer_details?.email}
      />
    );
  } catch (error) {
    console.error("Could not load checkout session", error);
    return <PaymentMessage paid={false} />;
  }
}

function PaymentMessage({
  paid,
  packageName,
  quantity,
  total,
  email,
}: {
  paid: boolean;
  packageName?: string | null;
  quantity?: number;
  total?: string | null;
  email?: string | null;
}) {
  return (
    <>
      <p className="text-sm font-bold uppercase tracking-widest text-racing">
        {paid ? "Payment confirmed" : "Payment"}
      </p>
      <h1 className="mt-3 text-5xl font-black uppercase">
        {paid ? "You're booked." : "Payment not found."}
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        {paid
          ? "Your card payment went through. Bring this confirmation to the track."
          : "We couldn't find a completed payment for this link. You can book a session from the prices page."}
      </p>
      {paid ? (
        <dl className="mt-10 max-w-md space-y-3 rounded-lg border border-border bg-card p-8 text-sm">
          {packageName ? (
            <div className="flex justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Session</dt>
              <dd className="font-semibold">{packageName}</dd>
            </div>
          ) : null}
          {quantity ? (
            <div className="flex justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Drivers</dt>
              <dd className="font-semibold">{quantity}</dd>
            </div>
          ) : null}
          {total ? (
            <div className="flex justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Total</dt>
              <dd className="font-semibold">{total}</dd>
            </div>
          ) : null}
          {email ? (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-semibold">{email}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={paid ? "/" : "/pricing"}
          className="rounded-md bg-racing px-6 py-3 font-bold uppercase tracking-wide text-racing-foreground transition-transform hover:scale-105"
        >
          {paid ? "Back home" : "See prices"}
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border px-6 py-3 font-bold uppercase tracking-wide transition-colors hover:bg-secondary"
        >
          Contact
        </Link>
      </div>
    </>
  );
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
