"use client";

import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const { title, courseId } = useParams();
  const classURL = searchParams.get("classURL");
  const classId = searchParams.get("classId");
  const [isCompleted, setIsCompleted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    // Load completion status from localStorage on mount
    const completedClasses = JSON.parse(localStorage.getItem('completedClasses') || '{}');
    setIsCompleted(!!completedClasses[classId as string]);
  }, [classId]);

  const handleToggle = () => {
    try {
      // Toggle the completion state
      const newCompletionState = !isCompleted;
      setIsCompleted(newCompletionState);

      // Update localStorage
      const completedClasses = JSON.parse(localStorage.getItem('completedClasses') || '{}');
      if (newCompletionState) {
        completedClasses[classId as string] = true;
      } else {
        delete completedClasses[classId as string];
      }
      localStorage.setItem('completedClasses', JSON.stringify(completedClasses));

      toast({
        title: "Success",
        description: `Class marked as ${newCompletionState ? 'completed' : 'incomplete'}`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to update class status",
        variant: "destructive",
      });
      setIsCompleted(!isCompleted); // Revert state on error
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      <div className="flex flex-col space-y-6">
        <Link href={`/classes/${courseId}`} className="w-fit">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Classes
          </Button>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {decodeURIComponent(title as string)}
          </h1>
          <p className="text-muted-foreground mt-2">Watch and complete your class</p>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleToggle} 
            className="w-fit"
            variant={isCompleted ? "default" : "outline"}
          >
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Button>
        </div>

        <VideoPlayer videoUrl={classURL as string} />
      </div>
    </div>
  );
};

export default Page;
