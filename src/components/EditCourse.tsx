import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Edit, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useCourses } from "@/hooks/useCreateCourse";

interface updateCourse {
  id: string;
  title: string;
  duration: string;
  price: number;
}

const EditCourse = ({ id, title, duration, price }: updateCourse) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title,
    price,
    duration,
  });

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/edit-course`, {
        courseId: id,
        ...values,
      });
      console.log(response.data);
      toast({
        title: "Updated!",
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        title: "Updated!",
        description:
          error.response.data.error[0].message ||
          "Error while Updating Course details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex gap-1">
          <Button variant={"link"} size={"sm"}>
            <Edit />
            Edit Course Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Course Details?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently update your
              course
            </DialogDescription>
            <form onSubmit={handleUpdateCourse}>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={values.title}
                  onChange={(e) =>
                    setValues({ ...values, title: e.target.value })
                  }
                  placeholder="Change Course Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Update Price</Label>
                <Input
                  value={values.price}
                  onChange={(e) =>
                    setValues({ ...values, price: Number(e.target.value) })
                  }
                  placeholder="Change Course Price"
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={values.duration}
                  onChange={(e) =>
                    setValues({ ...values, duration: e.target.value })
                  }
                  placeholder="course duration"
                />
              </div>
              <div className="my-2">
                <Button type="submit">
                  {isLoading ? (
                    <div className="flex gap-1 items-center">
                      <Loader2 className="animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCourse;
