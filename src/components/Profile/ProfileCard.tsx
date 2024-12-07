"use client";

import { motion } from "framer-motion";
import React, { useEffect} from "react";
import {
  Card,
  CardContent,
  CardDescription,
} from "../ui/card";
import EditUserDetails from "./EditUserDetails";
import ChangePassword from "./ChangePassword";
import AccountManage from "../AccountManage";
import { useProfileStore } from "@/store/ProfileStore/profileStore";
import AvatarUpload from "./AvatarUpload";

export default function ProfileCard() {
  const { user, fetchProfile } = useProfileStore();

  useEffect(()=>{
    fetchProfile()
  },[fetchProfile])

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="w-full flex justify-between flex-col bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
        <div className="flex items-center justify-center my-4">
          <AvatarUpload/>
        </div>
        <CardContent className="space-y-6">
          <CardDescription className="text-center italic">
            {user?.bio || "No bio provided"}
          </CardDescription>
          <div className="md:space-y-4 space-y-2 mx-auto max-w-xl dark:bg-neutral-900 bg-neutral-200 p-3 border-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <EditUserDetails />
              <ChangePassword />
            </div>
            <AccountManage />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
