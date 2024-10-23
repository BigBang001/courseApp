"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Edit, Loader2 } from "lucide-react";

export default function EditUserDetails() {
  const { data: session } = useSession();
  const name = session?.user.fullName;
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(name);
  const [bio, setBio] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/edit-user`, {
        fullName,
        bio,
      });
      toast({
        title: "Updated",
        description: response.data.message,
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Updated",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full"  variant="default" size={"sm"}><Edit/>Edit User Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="col-span-3"
            />
          </div>
          <Button disabled={isloading} type="submit" className="ml-auto">
            {isloading ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="animate-spin" />
                Updating...
              </div>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
