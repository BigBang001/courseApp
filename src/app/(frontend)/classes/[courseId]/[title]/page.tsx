"use client";

import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const { title } = useParams();
  const classURL = searchParams.get("classURL");
  const classId = searchParams.get("classId");

  const { toast } = useToast();
  const handleToogle = async () => {
    setTimeout(() => {
      toast({
        title: "Success!",
        variant: "success",
      });
    },500)

    try {
      const response = await axios.put("/api/course-classes", {
        classId: classId,
      });
      toast({
        title: "Success",
        description: response.data.message || "",
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="md:mx-20 mx-2 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-stone-500 font-bold mb-4">
          Class : {decodeURIComponent(title as string)}
        </h1>
        <Button onClick={handleToogle}>Mark as Complete/Incomplete</Button>
      </div>
      <VideoPlayer videoUrl={classURL as string} />
    </div>
  );
};

export default Page;
