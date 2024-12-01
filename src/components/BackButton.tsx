import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link href={href} className="inline-block mb-4">
      <Button variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        {title}
      </Button>
    </Link>
  );
}
