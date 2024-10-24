import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Minimize, X } from "lucide-react";
import { DashIcon } from "@radix-ui/react-icons";

const ClassCard = ({
  classId,
  title,
  classURL,
  index,
  markAsComplete,
}: {
  classId: string;
  title: string;
  classURL: string;
  index: number;
  markAsComplete: boolean;
}) => {
  const params = useParams();
  return (
    <div>
      <Card className="bg-stone-100 dark:bg-stone-950/50 md:h-80 relative">
        {markAsComplete ? (
          <div className="bg-green-500 rounded-bl-full pb-1 pl-1 lg:pl-3 lg:pb-3 text-green-950 absolute top-0 right-0">
            <Check className="h-4 w-4" fontWeight={800} />
          </div>
        ) : (
          <div className="bg-yellow-500 rounded-bl-full pb-1 pl-1 lg:pl-3 lg:pb-3 text-yellow-950 absolute top-0 right-0">
            <X className="h-4 w-4 " fontWeight={800} />
          </div>
        )}

        <CardHeader className="flex flex-col justify-between h-full">
          <CardTitle className="md:py-8">
            <p className="py-2 text-blue-500">{index}.</p>
            <h1 className="md:text-5xl capitalize font-serif text-lg text-stone-900 dark:text-stone-300">
              {title}
            </h1>
          </CardTitle>
          <div className="flex justify-end">
            <Link
              href={{
                pathname: `/classes/${params.courseId}/${title}`,
                query: { classURL, classId },
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
