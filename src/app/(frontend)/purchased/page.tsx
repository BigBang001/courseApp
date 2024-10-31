import React from "react";
import PurchasedCoursesPage from "@/components/PurchasedCoursesPage";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto px-4 md:px-24 py-8">
      <div className="flex flex-col space-y-6">
        <Link href="/explore" className="w-fit">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            My Purchased Courses
          </h1>
          <p className="text-muted-foreground mt-2">
            View and access all your purchased courses
          </p>
        </div>

        <PurchasedCoursesPage />
      </div>
    </div>
  );
};

export default Page;
