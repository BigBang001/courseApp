"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/data/CourseCategories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function CategoryFilters({ setFilter }: any) {
  const [searchCategory, setSearchCategory] = React.useState<string>("");

  const handleCategoryClick = (category: string) => {
    setFilter(category);
    setSearchCategory(category === searchCategory ? "" : category);
  };

  const clearFilters = () => {
    setSearchCategory("");
    setFilter("");
  };

  return (
    <>
      <div className="relative md:flex hidden w-full px-2 justify-between my-4">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[83%]"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {courseCategories.map((category) => (
              <CarouselItem key={category} className="pl-2 basis-auto">
                <Button
                  variant={
                    searchCategory === category ? "secondary" : "outline"
                  }
                  onClick={() => handleCategoryClick(category)}
                  className="whitespace-nowrap rounded-full select-none text-sm md:text-base py-1 px-3 md:py-2 md:px-4"
                >
                  {category}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 md:-left-16" />
          <CarouselNext className="hidden md:flex -right-12 md:-right-16" />
        </Carousel>
        <Button
          variant="destructive"
          onClick={clearFilters}
          className="whitespace-nowrap rounded-full text-sm md:text-base py-1 px-3 md:py-2 md:px-4"
        >
          Clear filters
        </Button>
      </div>
      <div>
        <div className="md:hidden mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full rounded-full justify-between">
                {searchCategory || "Select Category"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {courseCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onSelect={() => handleCategoryClick(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onSelect={clearFilters}
                className="text-destructive"
              >
                Clear filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
