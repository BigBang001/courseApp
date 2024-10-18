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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, UserMinus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import CreatedCourses from "@/components/CreatedCourses";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className=" dark:bg-neutral-900 bg-blue-50 bg-opacity-75 mb-8">
        <CardHeader className="flex flex-row items-center  space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl overflow-hidden font-bold uppercase">
              {session?.user.fullName ? (
                <h1>{session.user.fullName[0]}</h1>
              ) : (
                <Image width={12} height={12} className="w-full h-full" src={session?.user.image!} alt="User Logo" />
              )}
            </div>
            <div className="md:block flex flex-col justify-start">
              <div>
                <CardTitle className="capitalize">
                  {session?.user.fullName
                    ? session.user.fullName
                    : session?.user.name}
                </CardTitle>
                <CardDescription>{session?.user.email}</CardDescription>
              </div>
              <Badge className="ml-auto capitalize">{session?.user.role}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center">
                  <UserMinus className="mr-2 h-4 w-4" />
                  Deactivate
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to deactivate your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently
                    deactivate your account and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    // disabled={deactivateLoading}
                    variant={"destructive"}
                    // onClick={handleDeactivateAccount}
                  >
                    {/* {deactivateLoading
                      ? "Deactivating Account..."
                      : "Deactivate Account"} */}
                    Decativate
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          <div>
            <Link href={"/dashboard"}>
            <Button className="font-semibold">Add Course</Button></Link>
          </div>
          </div>
        </CardContent>
      </Card>

      <div>
        {session?.user.role === "admin" ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full font-semibold text-neutral-300 hover:text-white transition-colors">
                Created Courses
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full ">
                <DrawerHeader>
                  <DrawerTitle>Your Created Courses</DrawerTitle>
                </DrawerHeader>
                <div className="md:h-[50vh] h-[60vh] px-2 overflow-y-scroll">
                  <CreatedCourses />
                </div>
                <div className="w-full flex items-center justify-center">
                  <DrawerClose>
                    <Button variant="outline" className="w-full my-2">
                      Close
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                  Saved Jobs
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full">
                  <DrawerHeader>
                    <DrawerTitle>Saved Jobs</DrawerTitle>
                    <DrawerDescription>
                      Here are the jobs you saved for later.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="w-full flex items-center justify-center">
                    <DrawerClose>
                      <Button variant="outline" className="w-full mb-2">
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
                  Applied Jobs
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full">
                  <DrawerHeader>
                    <DrawerTitle>Applied Jobs</DrawerTitle>
                    <DrawerDescription>
                      Here are the job applications that you applied for.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-4 max-h-[60vh] my-2 overflow-y-auto custom-scrollbar"></div>
                  <div className="w-full flex items-center justify-center">
                    <DrawerClose>
                      <Button variant="outline" className="w-full mb-2">
                        Close
                      </Button>
                    </DrawerClose>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </div>
  );
}
