"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  BarChart,
  IndianRupee,
  ChartNoAxesCombined,
  Upload,
  Loader2,
  X,
} from "lucide-react";
import PurchasedCoursesPage from "@/components/PurchasedCoursesPage";
import { useSession } from "next-auth/react";
import CreatedCourses from "@/components/CreatedCourses";
import Link from "next/link";
import CourseStatics from "@/components/CourseStatics";
import AdminEarnings from "@/components/AdminEarnings";
import EditUserDetails from "@/components/EditUserDetails";
import ChangePassword from "@/components/ChangePassword";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {  useRef, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useMe } from "@/hooks/userMe";
import AccountManage from "@/components/AccountManage";


export default function Profile() {
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!previewImage) return;

    setIsUploading(true);
    const formData = new FormData();
    const blob = await fetch(previewImage).then((r) => r.blob());
    formData.append("avatar", blob, "avatar.jpg");

    try {
      await axios.post("/api/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({
        title: "Success",
        description: "Avatar updated successfully",
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const cancelPreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { user } = useMe();

  return (
    <div className="container mx-auto gap-4 md:grid grid-cols-3 p-4">
      <Card className="w-full flex justify-between flex-col max-w-3xl mb-4 md:mb-0 mx-auto bg-stone-100 dark:bg-stone-950/50">
       <div>
       <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              {previewImage ? (
                <AvatarImage src={previewImage} alt="Preview" />
              ) : (
                <>
                  <AvatarImage
                    src={user?.image || undefined}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold uppercase">
                    {session?.user.fullName?.[0] || "?"}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
            </div>
            <Input
              ref={fileInputRef}
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
              disabled={isUploading}
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <CardTitle className="capitalize text-stone-900 dark:text-stone-200 font-serif text-2xl sm:text-3xl text-center sm:text-left">
              {session?.user.fullName}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-center sm:text-left">
              {session?.user.email}
            </CardDescription>
            <Badge className="mt-2 capitalize text-xs sm:text-sm">
              {session?.user.role}
            </Badge>
          </div>
        </CardHeader>
        {previewImage && (
          <div className="flex justify-center space-x-2 my-4">
            <Button
              variant={"default"}
              onClick={handleAvatarUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Save New Avatar"
              )}
            </Button>
            <Button variant="outline" onClick={cancelPreview}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
       </div>
        <CardContent>
          <CardDescription className="mb-4">{user?.bio}</CardDescription>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <EditUserDetails />
              <ChangePassword />
            </div>
            <AccountManage />
          </div>
        </CardContent>
      </Card>

      <div className="col-span-2 space-y-4">
        {session?.user.role === "admin" && (
          <Card className="bg-stone-100 dark:bg-stone-950/50">
            <CardHeader>
              <CardTitle>User Menu</CardTitle>
              <CardDescription>
                Manage your courses and view dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/create/addcourse">
                <Button className="w-full font-semibold">Add Course</Button>
              </Link>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full font-semibold">
                    <BarChart className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-4xl">
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl">Dashboard</DrawerTitle>
                      <DrawerDescription>
                        Your course statistics and earnings
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="relative overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex  items-center justify-between">
                              <span className="text-3xl">
                                Course Statistics
                              </span>
                              <div className="absolute md:top-0 top-16 right-0">
                                <ChartNoAxesCombined className="md:h-56 md:w-56  h-36 w-36 text-red-500 text-primary" />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CourseStatics />
                          </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="text-3xl">Earnings</span>
                              <div className="absolute md:top-0 top-16 right-0">
                                <IndianRupee className="md:h-56 md:w-56 h-36 w-36 text-green-500" />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <AdminEarnings />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center p-4">
                      <DrawerClose>
                        <Button variant="outline" className="w-full">
                          Close
                        </Button>
                      </DrawerClose>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
        )}

        <Card className="bg-stone-100 dark:bg-stone-950/50">
          <div>
            <CardHeader>
              <CardTitle>
                {session?.user.role !== "admin"
                  ? "User Courses"
                  : "Created Courses"}
              </CardTitle>
              <CardDescription>
                {session?.user.role !== "admin"
                  ? "Manage your courses"
                  : "Manage your created courses"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {session?.user.role !== "admin" ? (
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Purchased Courses
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            {" "}
                            Purchased Courses
                          </DrawerTitle>
                          <DrawerDescription>
                            Here are the courses you Purchased.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                          <PurchasedCoursesPage />
                        </div>
                        <div className="w-full flex items-center justify-center p-4">
                          <DrawerClose>
                            <Button variant="outline" className="w-full">
                              Close
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Saved Courses
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-4xl">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            Applied Jobs
                          </DrawerTitle>
                          <DrawerDescription>
                            Here are the courses you saved for later.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar"></div>
                        <div className="w-full flex items-center justify-center p-4">
                          <DrawerClose>
                            <Button variant="outline" className="w-full">
                              Close
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              ) : (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors"
                    >
                      View Created Courses
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full">
                      <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                          Your Created Courses
                        </DrawerTitle>
                      </DrawerHeader>
                      <div className="md:h-[50vh] h-[60vh] px-4 overflow-y-auto">
                        <CreatedCourses />
                      </div>
                      <div className="w-full flex items-center justify-center p-4">
                        <DrawerClose>
                          <Button variant="outline" className="w-full">
                            Close
                          </Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
