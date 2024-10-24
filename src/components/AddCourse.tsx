"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

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

export default function AddCourse() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: 0,
    duration: "",
    level: "",
    tags: "",
    shortDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/create-course`, values);
      console.log(response);
      toast({
        title: "Created!",
        description: `${response.data.course.title} course Created Successfully`,
        variant: "success",
      });
      router.push("/explore");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-4">
      <Card className="max-w-4xl bg-secondary/30 mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Add Course
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter the details of your new course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter the title of the course"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description </Label>
              <Textarea
                value={values.shortDescription}
                onChange={(e) =>
                  setValues({ ...values, shortDescription: e.target.value })
                }
                placeholder="Short Description for course that shown in card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="h-64">
                <ReactQuill
                  value={values.description}
                  onChange={(content: string) =>
                    setValues({ ...values, description: content })
                  }
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  placeholder="Enter a detailed description of the course"
                  className="h-full dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:pt-8 pt-12 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="text"
                  placeholder="e.g., 1 Hour"
                  value={values.duration}
                  onChange={(e) =>
                    setValues({ ...values, duration: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  value={values.price}
                  onChange={(e) =>
                    setValues({ ...values, price: Number(e.target.value) })
                  }
                  required
                />
              </div>{" "}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  value={values.tags}
                  onChange={(e) =>
                    setValues({ ...values, tags: e.target.value })
                  }
                  placeholder="Tags comma seperated (eg., Web dev, Node.js...)"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  placeholder="Enter the thumbnail image URL"
                  value={values.thumbnail}
                  onChange={(e) =>
                    setValues({ ...values, thumbnail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Difficulty Level</Label>
                <Select
                  value={values.level}
                  onValueChange={(value) =>
                    setValues({ ...values, level: value })
                  }
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select the difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
