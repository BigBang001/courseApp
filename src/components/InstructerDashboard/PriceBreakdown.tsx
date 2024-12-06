import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function PriceBreakdown() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            className="rounded-none"
            size={"sm"}
            type="button"
          >
            View Price Breakdown
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Price Breakdown Example</DialogTitle>
            <DialogDescription>
              Here's how the course price is split between you and the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="font-semibold mb-2">For a ₹499 course:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Course Price: ₹499.00</li>
              <li>Platform Fee (3%): ₹14.97</li>
              <li>You Receive: ₹484.03</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              The platform fee helps us maintain and improve our services. The
              majority of the course price goes directly to you, the instructor.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
