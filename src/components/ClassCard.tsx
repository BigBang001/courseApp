import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const ClassCard = ({
  title,
  classURL,
  index,
}: {
  title: string;
  classURL: string;
  index: number
}) => {
  const params = useParams();
  return (
    <div>
      <Card className="bg-stone-100 dark:bg-stone-950/50 md:h-80 ">
        <CardHeader className="flex flex-col justify-between h-full">
          <CardTitle className="md:py-8">
            <p className="py-2 text-blue-500">{index}.</p>
            <h1 className="md:text-5xl font-serif text-lg text-stone-900 dark:text-stone-300">
              {title}
            </h1>
          </CardTitle>
          <div className="flex justify-end">
            <Link
              href={{
                pathname: `/classes/${params.courseId}/${title}`,
                query: { classURL },
              }}
            >
              <Button>Play</Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClassCard;
