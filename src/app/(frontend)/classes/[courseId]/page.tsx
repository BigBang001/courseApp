"use client";
import ClassCard from "@/components/ClassCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface classes {
  videoUrl: string;
  title: string;
}

const Page = () => {
  const [classes, setClasses] = useState<classes[]>([]);
  const params = useParams();

  useEffect(() => {
    try {
      const fetchClasses = async () => {
        const response = await axios.get(
          `/api/course-classes/${params.courseId}`
        );
        const classes = response.data.classes;
        console.log(classes);

        setClasses(classes);
      };
      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  }, [params.courseId]);

  return (
    <div className=" mx-2 md:mx-10">
      <h1 className="font-semibold text-2xl mt-2 mb-4">
        Course Title Goes here...
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {classes.length > 0 ? (
          classes.map((e , idx) => <ClassCard key={idx} index={idx+1} classURL={e.videoUrl} title={e.title} />)
        ) : (
          <div>No claases added yet</div>
        )}
      </div>
    </div>
  );
};

export default Page;
