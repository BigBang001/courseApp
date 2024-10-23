import React from "react";
import PurchasedCoursesPage from "@/components/PurchasedCoursesPage";
const Page = () => {
  return (
    <div className="mt-6 md:mt-0 mb-2">
      <h1 className="text-2xl font-bold px-4 py-2 md:px-24">My Purchased Courses</h1>
      <PurchasedCoursesPage />
    </div>
  );
};

export default Page;
