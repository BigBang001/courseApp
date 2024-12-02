"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/Profile/ProfileCard";
import SavedCourses from "@/components/Course/SavedCourses";
import PurchasedCourses from "@/components/Course/purchasedCourses";
import { useProfileStore } from "@/store/ProfileStore/profileStore";
import { useEffect } from "react";
import { useSavedCoursesStore } from "@/store/courseStore/savedCoursesStore";
import { usePurchasedCoursesStore } from "@/store/courseStore/purchasesCoursesStore";
import BackButton from "@/components/BackButton";

export default function Profile() {
  const { status: sessionStatus } = useSession();
  const { fetchSavedCourses } = useSavedCoursesStore();
  const { fetchPurchasedCourses } = usePurchasedCoursesStore();
  useEffect(() => {
    fetchSavedCourses();
    fetchPurchasedCourses();
  }, []);

  if (sessionStatus === "loading") {
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
      className="bg-gradient-to-b from-background to-background/80 md:py-8 py-4"
    >
      <div className="container mx-auto px-3">
        <div className="py-2">
          <BackButton href="/explore" title=" Back to Courses" />
        </div>
        <div className="grid md:gap-8 gap-4 md:grid-cols-3">
          <ProfileCard />

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:space-y-8 space-y-3"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  My Learning Journey
                </CardTitle>
                <CardDescription>Manage your course catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PurchasedCourses />
                  <SavedCourses />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
