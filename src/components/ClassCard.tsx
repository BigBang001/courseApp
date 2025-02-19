import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, X } from "lucide-react";

const ClassCard = ({
  classId,
  title,
  classURL,
  index,
  duration,
}: {
  classId: string;
  title: string;
  classURL: string;
  index: number;
  duration: number;
}) => {
  const params = useParams();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const completedClasses = JSON.parse(
      localStorage.getItem("completedClasses") || "{}"
    );
    setIsCompleted(!!completedClasses[classId]);
  }, [classId]);

  return (
    <div>
      <Card className="bg-stone-100 overflow-hidden dark:bg-stone-950/50 md:h-80 relative">
        {isCompleted ? (
          <div className="bg-green-500 rounded-bl-full  pb-2 pl-2 p-1 lg:pt-1 lg:pr-1 lg:p-2 text-green-950 absolute top-0 right-0">
            <Check className="h-4 w-4" fontWeight={800} />
          </div>
        ) : (
          <div className="bg-yellow-500 rounded-bl-full pb-2 pl-2 p-1 lg:pt-1 lg:pr-1 lg:p-2 text-yellow-950 absolute top-0 right-0">
            <X className="h-4 w-4 " fontWeight={800} />
          </div>
        )}

        <CardHeader className="flex flex-col justify-between h-full">
          <CardTitle className="md:py-8 py-3">
            <p className="py-2 text-blue-500">{index}.</p>
            <h1 className="md:text-5xl capitalize font-serif text-lg text-stone-900 dark:text-stone-300">
              {title}
            </h1>
          </CardTitle>
          <div className="absolute bottom-2 right-2 w-full">
            <div className="flex w-full justify-between items-end">
              <h1 className="pl-5 md:text-base text-sm font-semibold font-serif text-stone-500">
                {duration < 60
                  ? `${duration.toFixed(2)} sec`
                  : duration < 3600
                  ? `${(duration / 60).toFixed(2)} min`
                  : `${(duration / 3600).toFixed(2)} hr`}
              </h1>
              <Link
                href={{
                  pathname: `/classes/${params.courseId}/${title}`,
                  query: { classURL, classId },
                }}
              >
                <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Play
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClassCard;
