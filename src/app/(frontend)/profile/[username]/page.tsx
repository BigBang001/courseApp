"use client";

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
  Loader2,
  ArrowLeft,
  BookOpen,
  Bookmark,
  PlusCircle,
} from "lucide-react";
import PurchasedCoursesPage from "@/components/PurchasedCoursesPage";
import { useSession } from "next-auth/react";
import CreatedCourses from "@/components/CreatedCourses";
import Link from "next/link";
import { useMe } from "@/hooks/userMe";
import { motion } from "framer-motion";
import ProfileCard from "@/components/Profile/ProfileCard";
import AdminDashboard from "@/components/Profile/AdminDashboard";

export default function Profile() {
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading } = useMe();

  if (sessionStatus === "loading" || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 color="gray" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-background to-background/80 py-8"
    >
      <div className="container mx-auto px-4">
        <Link href="/explore" className="inline-block mb-4">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        <div className="grid gap-8 md:grid-cols-3">
          <ProfileCard />

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 space-y-8"
          >
            {session?.user.role === "admin" && <AdminDashboard />}

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  {session?.user.role !== "admin"
                    ? "My Learning Journey"
                    : "Created Courses"}
                </CardTitle>
                <CardDescription>
                  {session?.user.role !== "admin"
                    ? "Track your progress and saved courses"
                    : "Manage your course catalog"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {session?.user.role !== "admin" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full transition-all duration-300 hover:scale-105"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Purchased Courses
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full">
                          <DrawerHeader>
                            <DrawerTitle className="text-3xl font-serif">
                              Purchased Courses
                            </DrawerTitle>
                            <DrawerDescription>
                              Your learning progress
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <PurchasedCoursesPage />
                          </div>
                          <div className="p-4 flex justify-center">
                            <DrawerClose>
                              <Button
                                variant="outline"
                                className="w-40 transition-all duration-300 hover:scale-105"
                              >
                                Close
                              </Button>
                            </DrawerClose>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full transition-all duration-300 hover:scale-105"
                        >
                          <Bookmark className="mr-2 h-4 w-4" />
                          Saved Courses
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="mx-auto w-full max-w-4xl">
                          <DrawerHeader>
                            <DrawerTitle className="text-3xl font-serif">
                              Saved Courses
                            </DrawerTitle>
                            <DrawerDescription>
                              Courses you've bookmarked for later
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {/* Add your SavedCourses component here */}
                          </div>
                          <div className="p-4 flex justify-center">
                            <DrawerClose>
                              <Button
                                variant="outline"
                                className="w-40 transition-all duration-300 hover:scale-105"
                              >
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
                        className="w-full font-semibold transition-all duration-300 hover:scale-105"
                      >
                        View Created Courses
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full">
                        <DrawerHeader>
                          <DrawerTitle className="text-3xl font-serif">
                            Your Created Courses
                          </DrawerTitle>
                        </DrawerHeader>
                        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                          <CreatedCourses />
                        </div>
                        <div className="p-4 flex justify-center">
                          <DrawerClose>
                            <Button
                              variant="outline"
                              className="w-40 transition-all duration-300 hover:scale-105"
                            >
                              Close
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
