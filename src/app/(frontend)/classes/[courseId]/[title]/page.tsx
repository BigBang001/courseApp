"use client";

import VideoPlayer from "@/components/VideoPlayer";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const {title} = useParams();
  const classURL = searchParams.get("classURL");

  return (
    <div className="md:mx-20 mx-2 pt-4">
      <h1 className="text-2xl font-serif text-stone-500 font-bold mb-4">Class : {decodeURIComponent(title as string)}</h1>
      <VideoPlayer videoUrl={classURL as string} />
    </div>
  );
};

export default Page;
