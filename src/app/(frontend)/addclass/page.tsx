"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AddClass() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    courseId: "", // Assuming the instructor needs to select a course
  });
  const [files, setFiles] = useState({
    thumbnail: null as File | null,
    video: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: files[0], // Store the selected file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("courseId", values.courseId);
      if (files.thumbnail) formData.append("thumbnail", files.thumbnail);
      if (files.video) formData.append("recordedClass", files.video);

      const response = await axios.post(`/api/add-class`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Created!",
        description: `Class "${response.data.recordedClass.title}" added successfully!`,
        variant: "default",
      });

      router.push("/explore"); // Redirect after success
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Error while adding class.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-4">
    
    </div>
  );
}
