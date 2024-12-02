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
    <Link href={href} className="inline-block">
      <Button size={"sm"} variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden md:inline">{title}</span>
      </Button>
    </Link>
  );
}
