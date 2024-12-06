import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/InstructerDashboard/overview";
import { RecentStudents } from "@/components/InstructerDashboard/RecentStudents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardCards from "@/components/InstructerDashboard/DashboardCards";
import { BookOpen, PlusCircle } from "lucide-react";
import BackButton from "@/components/BackButton";
import ProfileCard from "@/components/Profile/ProfileCard";
import RefreshDashboardData from "@/components/InstructerDashboard/RefreshDashboardData";

export default function DashboardPage() {
  return (
    <div className="md:px-32 px-2 md:py-10 py-4">
      <div className="flex gap-2 justify-between flex-wrap py-4">
        <div className="flex gap-2">
          <BackButton href="/explore" title="Back to Courses" />
          <Link href={"/dashboard/courses"}>
            <Button size={"sm"} variant={"default"}>
              <BookOpen /> Your Courses
            </Button>
          </Link>
        </div>
        <div className="flex gap-1">
          <RefreshDashboardData/>
          <Link href="/create">
            <Button size={"sm"} variant="secondary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </Link>
        </div>
      </div>
      <DashboardCards />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentStudents />
            {/* <ProfileCard /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
