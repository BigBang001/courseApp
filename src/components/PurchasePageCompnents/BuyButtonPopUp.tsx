import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { createOrderId } from "@/lib/createOrderId";
import { Course } from "@/types/courseType";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export function BuyButtonPopUp(course: Course) {
  const [open, setOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const coursePrice = course.price!;
  const [priceDetails, setPriceDetails] = useState({
    basePrice: coursePrice ?? 0,
    platformFee: 0,
    total: 0,
  });

  useEffect(() => {
    const platformFee = coursePrice * 0.03; // 3% platform fee
    const total = coursePrice + platformFee;

    setPriceDetails({
      basePrice: coursePrice,
      platformFee: platformFee,
      total: total,
    });
  }, [coursePrice]);

  const processPayment = async () => {
    try {
      setIsPurchasing(true);
      const orderId: string = await createOrderId(
        priceDetails.total,
        course.id as string
      );
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: priceDetails.total * 100, // Amount in paisa
        currency: "INR",
        name: course?.title,
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          console.log(data);

          const result = await axios.post("/api/purchase/verifyOrder", data);
          if (result.status === 200) {
            toast({
              title: "Success",
              description: "Payment successful! You can now access the course.",
            });
          } else {
            toast({
              title: "Error",
              description:
                "Payment verification failed: " + result.data.message,
              variant: "destructive",
            });
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.on("payment.failed", function (response: any) {
        toast({
          title: "Error",
          description: response.error.description,
          variant: "destructive",
        });
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="overflow-hidden">
          <CardContent className="p-0 overflow-hidden">
            <div className="aspect-video relative ">
              <Image
                src={course.thumbnail!}
                alt={course.title!}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardContent>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>₹{priceDetails.basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (5%):</span>
                <span>₹{priceDetails.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total:</span>
                <span>₹{priceDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                setOpen(false);
                processPayment();
              }}
            >
              Buy Now
            </Button>
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
