"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useBulkCourseClassesStore } from "@/store/classesStore/bulkCourseClassesStore";

export default function DeleteClass({ classId }: { classId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteClass, deletingClass } = useBulkCourseClassesStore();
  const { courseId } = useParams();
  const handleDelete = async () => {
    deleteClass(courseId as string, classId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
          Delete Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this class?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
            <span className="block mt-2 font-semibold text-red-500">
              Warning: Deleting this class will permanently remove all
              associated data, including student progress and materials.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deletingClass}
          >
            {deletingClass ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
