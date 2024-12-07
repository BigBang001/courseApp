"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, Loader2, X } from "lucide-react";
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
import { useTheme } from "next-themes";
import { log } from "console";
import LoadingButton from "../LoadingButton";
import Image from "next/image";

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
  const { theme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewThumbnail(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [calculatedPrice, setCalculatedPrice] = useState({
    originalPrice: 0,
    platformFee: 0,
    totalPrice: 0,
  });

  const form = useForm<z.infer<typeof courseValidation>>({
    resolver: zodResolver(courseValidation),
  });

  const onSubmit = async (values: z.infer<typeof courseValidation>) => {
    if (!previewThumbnail) {
      return toast({
        title: "Error",
        description: "Please upload a course thumbnail",
        variant: "destructive",
      });
    }
    const formData = new FormData();
    const blob = await fetch(previewThumbnail).then((r) => r.blob());

    formData.append("thumbnail", blob, "thumbnail.jpg");
    formData.append("title", values.title);
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("price", values.price.toString());
    formData.append("tags", values.tags);
    formData.append("language", values.language);
    formData.append("level", values.level);
    formData.append("category", values.category);

    //dev only
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <p>
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">
    //           {JSON.stringify(values, null, 2)}
    //         </code>
    //       </pre>
    //     </p>
    //   ),
    // });

    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/courses/create-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Course Created Successfully! 🎉",
        description: `Your course "${response.data.course.title}" is now live and ready for students.`,
        variant: "success",
      });
      router.push("/explore");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.log(error);
      
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
    <div className="container max-w-5xl mx-auto py-8">
      <BackButton href="/dashboard" title="Back to dashboard" />
      <div className="py-4">
        <h1 className="text-3xl font-serif dark:text-stone-200 font-semibold">
          Create Your Course
        </h1>
        <p className="font-serif text-sm text-neutral-500">
          Fill all the details below to create your course and make it available
          for students
        </p>
      </div>
      <Card className="border-none dark:bg-neutral-900 bg-neutral-100 rounded-lg shadow-none mx-auto">
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
                        className=" text-lg"
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
                        className="text-lg h-28"
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
                          style={{
                            backgroundColor:
                              theme === "dark" ? "#262626" : "white",
                            color: "white",
                            borderRadius: "20px",
                            paddingBottom: "40px",
                          }}
                          placeholder="Paint a picture of your course content..."
                          className="h-96"
                        />
                      </FormControl>
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
                          className=" text-lg"
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
                          className=" text-lg"
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
                        className="text-lg h-24"
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

              <div>
                <Label>Course image</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Image
                      src={
                        previewThumbnail ||
                        "https://s.udemycdn.com/course/750x422/placeholder.jpg"
                      }
                      alt="Thumbnail Preview"
                      className="w-full h-fullobject-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      className=" text-lg"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      placeholder="Select an image"
                    />
                    <p className="text-sm py-2 text-neutral-400">
                      Upload your course image here. Important guidelines:
                      750x422 pixels; .jpg, .jpeg , or .png. no text on the
                      image.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <FormControl>
                          <Input
                            className=" text-lg"
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
                          <SelectTrigger className="dark:bg-neutral-800 bg-white text-lg">
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
                          <SelectTrigger className="dark:bg-neutral-800 bg-white text-lg">
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
              <LoadingButton
                isLoading={isLoading}
                loadingTitle=" Creating Your Masterpiece..."
                title="Launch Your Course"
                disabled={isLoading}
                type="submit"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
