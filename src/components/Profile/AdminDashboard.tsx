import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  BarChart,
  ChartNoAxesCombined,
  IndianRupee,
  PlusCircle,
} from "lucide-react";
import CourseStatics from "../CourseStatics";
import AdminEarnings from "../AdminEarnings";

export default function AdminDashboard() {
  return (
    <div>
      <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Admin Dashboard</CardTitle>
          <CardDescription>
            Manage your courses and view analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/create">
            <Button className="w-full font-semibold transition-all duration-300 hover:scale-105">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </Link>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="w-full font-semibold transition-all duration-300 hover:scale-105"
              >
                <BarChart className="mr-2 h-4 w-4" />
                View Analytics Dashboard
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-4xl">
                <DrawerHeader>
                  <DrawerTitle className="text-3xl font-serif">
                    Analytics Dashboard
                  </DrawerTitle>
                  <DrawerDescription>
                    Your course statistics and earnings
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-2xl font-serif">
                          <span>Course Statistics</span>
                          <ChartNoAxesCombined className="h-12 w-12 text-primary opacity-50" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CourseStatics />
                      </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-2xl font-serif">
                          <span>Earnings</span>
                          <IndianRupee className="h-12 w-12 text-green-500 opacity-50" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AdminEarnings />
                      </CardContent>
                    </Card>
                  </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
