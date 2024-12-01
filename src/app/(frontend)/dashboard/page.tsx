import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/InstructerDashboard/overview";
import { RecentStudents } from "@/components/InstructerDashboard/RecentStudents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardCards from "@/components/InstructerDashboard/DashboardCards";
import { BookOpen } from "lucide-react";
import UpdateProfileDialog from "@/components/InstructerDashboard/UpdateProfileDialog";
import BackButton from "@/components/BackButton";

export default function DashboardPage() {
  return (
    <div className="md:px-32 px-2 py-10">
      <div className="flex gap-2 flex-wrap py-2">
        <BackButton href="/explore" title="Back to Courses" />
        <Link href={"/dashboard/courses"}>
          <Button variant={"outline"}>
            <BookOpen/> Your Courses
          </Button>
        </Link>
        <UpdateProfileDialog/>
      </div>
      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentStudents />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
