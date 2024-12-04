"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrderId } from "@/lib/createOrderId";

function Payment() {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderId: string = await createOrderId(amount);

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: "Your Business Name",
        description: "Purchase Description",
        order_id: orderId,
        handler: async function (response: any) {
          console.log("full response: ", response);

          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          console.log("Data: ", data);

          const result = await fetch("/api/purchase/verifyOrder", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed: " + res.message);
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onError={() => alert("Failed to load Razorpay script. Please reload.")}
      />

      <section className="min-h-[94vh] flex flex-col gap-6 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36">
        <form
          className="flex flex-col gap-6 w-full sm:w-80"
          onSubmit={processPayment}
        >
          <div className="space-y-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="1"
              min={1}
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay"}
          </Button>
        </form>
      </section>
    </>
  );
}

export default Payment;
