"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ReviewCourse({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [close, setClose] = useState(false);
  const [values, setValues] = useState({
    content: "",
    rating: 0,
  });
  const { toast } = useToast();

  const handleReviewCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/review-course", {
        ...values,
        userId: session?.user.id,
        courseId,
      });
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
        variant: "success"
      });
      setClose(false)
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error?.[0]?.message ||
        "Error while reviewing course";
      setClose(true);
      toast({
        title: "Review failed!",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={close} onOpenChange={setClose}  >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          Review Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this course. Your feedback helps others
            make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleReviewCourse} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= values.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setValues({ ...values, rating: star })}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Review</Label>
            <Textarea
              id="content"
              value={values.content}
              onChange={(e) =>
                setValues({ ...values, content: e.target.value })
              }
              placeholder="Share your experience with this course..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
