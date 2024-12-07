"use client";

import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function LoadingButton({
  isLoading,
  title,
  loadingTitle,
  disabled,
  type,
}: {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading: boolean;
  title: string;
  loadingTitle: string;
}) {
  return (
    <Button type={type} disabled={disabled}>
      {isLoading ? (
        <div className="flex items-center">
          <span>{loadingTitle}</span>
          <span className="ml-1">
            <Loader2 className="animate-spin" />
          </span>
        </div>
      ) : (
        title
      )}
    </Button>
  );
}
