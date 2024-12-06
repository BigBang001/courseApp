"use client";

import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CourseLevel, courseValidation } from "@/validations/validation";
import { useSession } from "next-auth/react";
import { courseCategories } from "@/data/CourseCategories";
import BackButton from "../BackButton";
import PriceBreakdown from "../InstructerDashboard/PriceBreakdown";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const calculateTotalPrice = (price: number) => {
  const platformFee = price * 0.03;
  return {
    originalPrice: price,
    platformFee: platformFee,
    totalPrice: price + platformFee,
  };
};

export default function AddCourse() {
  const [calculatedPrice, setCalculatedPrice] = useState({
    originalPrice: 0,
    platformFee: 0,
    totalPrice: 0,
  });
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof courseValidation>>({
    resolver: zodResolver(courseValidation),
  });

  const onSubmit = async (values: z.infer<typeof courseValidation>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/courses/create-course`, values);
      toast({
        title: "Course Created Successfully! 🎉",
        description: `Your course "${response.data.course.title}" is now live and ready for students.`,
        variant: "success",
      });
      router.push("/explore");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Oops! Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton href="/dashboard" title="Back to dashboard" />
      <Card className="max-w-4xl bg-popover rounded-none shadow-none mx-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-serif text-stone-300 font-semibold">
            Create Your Course
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none text-lg"
                        {...field}
                        placeholder="What will you teach?"
                      />
                    </FormControl>
                    <FormDescription>
                      Your title should be a mix of attention-grabbing,
                      informative, and optimized for search
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course subtitle</FormLabel>
                    <FormControl>
                      <Textarea
                        className="rounded-none text-lg h-28"
                        {...field}
                        placeholder="Hook your students with a compelling summary..."
                      />
                    </FormControl>
                    <FormDescription>
                      Use 1 or 2 related keywords, and mention 3-4 of the most
                      important areas that you've covered during your course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <Label htmlFor="description">Course description</Label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ReactQuill
                          {...field}
                          modules={modules}
                          formats={formats}
                          theme="snow"
                          placeholder="Paint a picture of your course content..."
                          className="h-72 md:mb-12 mb-20"
                        />
                      </FormControl>
                      <FormDescription>
                        Use this space to describe your course in detail. The
                        more information you provide, the more likely students
                        are to enroll.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none text-lg"
                          {...field}
                          placeholder="e.g., 8 weeks"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide an estimate of how long it will take to complete
                        your course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Price</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none text-lg"
                          type="number"
                          {...field}
                          placeholder="Set your price"
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? "" : value);
                            setCalculatedPrice(
                              calculateTotalPrice(isNaN(value) ? 0 : value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <p className="text-base text-blue-500 mt-2">
                          Price: ₹{calculatedPrice.originalPrice.toFixed(2)} +
                          3% platform fee (₹
                          {calculatedPrice.platformFee.toFixed(2)}) = ₹
                          {calculatedPrice.totalPrice.toFixed(2)}
                        </p>
                      )}
                      <PriceBreakdown />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Tags</FormLabel>
                    <FormControl>
                      <Textarea
                        className="rounded-none text-lg h-24"
                        {...field}
                        placeholder="Add relevant tags (e.g., Programming, Design, Business)"
                      />
                    </FormControl>
                    <FormDescription>
                      Add tags that describe your course. Separate each tag with
                      a comma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Thumbnail</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none text-lg"
                          {...field}
                          placeholder="Add an eye-catching thumbnail URL"
                        />
                      </FormControl>
                      <FormDescription>
                        This image will be displayed in search results and on
                        your course page.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <FormControl>
                          <Input
                            className="rounded-none text-lg"
                            {...field}
                            placeholder="English, Spanish, etc."
                          />
                        </FormControl>
                      </FormControl>
                      <FormDescription>
                        In which language is your course taught?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value as CourseLevel}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-none text-lg">
                            <SelectValue placeholder="Select Course Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the level that best describes your course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-none text-lg">
                            <SelectValue placeholder="Select Course Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the level that best describes your course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Masterpiece...
                  </span>
                ) : (
                  "Launch Your Course 🚀"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
