"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchCourses } from "@/hooks/useFetchCourses";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filters } from "@/data/filters.json";
import { BarLoader } from "react-spinners";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [technology, setTechnology] = useState("");
  const [database, setDatabase] = useState("");
  const [framework, setFramework] = useState("");
  const [area, setArea] = useState("");
  const { courses, isLoading, setFilter, isSearching } = useFetchCourses();

  useEffect(() => {
    const timer = setTimeout(() => {
      const filterString = [technology, database, framework, area, searchTerm]
        .filter(Boolean)
        .join(",");
      setFilter(filterString);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, technology, database, framework, area, setFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setTechnology("");
    setDatabase("");
    setFramework("");
    setArea("");
    setFilter("");
  };

  const SkeletonCard = () => (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );

  return (
    <div className="w-[95%] md:w-[80%] mx-auto">
      <div className="border-b mb-10">
        <div className="headings pb-3">
          <h1 className="md:text-5xl text-3xl font-serif">
            All the skills you need in one place
          </h1>
          <p className="text-neutral-400 mt-2 mb-4">
            Explore Courses according to your need
          </p>
          <div>
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search Courses via tags or title"
              aria-label="Search Courses"
            />
          </div>
          {isSearching && (
            <div className="py-4 w-full">
              <BarLoader width={"100%"} color="white" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 pb-2">
          <Select onValueChange={setTechnology}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Technology" />
            </SelectTrigger>
            <SelectContent>
              {filters.technology.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setDatabase}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Database" />
            </SelectTrigger>
            <SelectContent>
              {filters.database.map((db) => (
                <SelectItem key={db} value={db}>
                  {db}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setFramework}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              {filters.framework.map((fw) => (
                <SelectItem key={fw} value={fw}>
                  {fw}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setArea}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent>
              {filters.area.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={clearFilters} variant={"destructive"}>
            Clear Filters
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array(6)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              createdAt={course.createdAt}
              description={course.description}
              duration={course.duration}
              id={course.id}
              level={course.level}
              userId={course.userId}
              title={course.title}
              shortDescription={course.shortDescription}
              thumbnail={course.thumbnail}
              tags={course.tags}
              price={course.price}
              course={course}
              Review={course.Review}
            />
          ))
        ) : (
          <div className="col-span-full text-center">
            <h2 className="text-2xl font-semibold italic">
              No Courses Available!
            </h2>
            <p className="text-neutral-400 mt-2">
              Try adjusting your search or selecting different filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
