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
import { data } from "@/data/filters";
import { BarLoader } from "react-spinners";
import { Course } from "@/types/courseType";

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
    <div className="min-h-screen rounded-xl mx-3 bg-gradient-to to-background">
      <div className="w-[95%] md:w-[80%] mx-auto pt-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Career with Expert-Led Courses
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Join thousands of learners who have advanced their careers through our comprehensive course catalog
          </p>
        </div>

        <div className="bg-card rounded-xl p-3 md:p-6 shadow-lg border border-border/50 mb-10">
          <div className="space-y-6">
            <div className="mx-auto">
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="🔍 Search for your next learning adventure..."
                className="w-full"
                aria-label="Search Courses"
              />
            </div>

            {isSearching && (
              <div className="w-full">
                <BarLoader width={"100%"} color="white" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <Select onValueChange={setTechnology} value={technology}>
                <SelectTrigger>
                  <SelectValue placeholder="🔧 Technology" />
                </SelectTrigger>
                <SelectContent>
                  {data.filters.technology.map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={setFramework} value={framework}>
                <SelectTrigger>
                  <SelectValue placeholder="⚡ Framework" />
                </SelectTrigger>
                <SelectContent>
                  {data.filters.framework.map((fw) => (
                    <SelectItem key={fw} value={fw}>
                      {fw}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={setArea} value={area}>
                <SelectTrigger>
                  <SelectValue placeholder="🎯 Area" />
                </SelectTrigger>
                <SelectContent>
                  {data.filters.area.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={clearFilters} variant="destructive">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          ) : courses.length > 0 ? (
            courses.map((course: Course) => (
              <CourseCard
                course={course}
                key={course.id}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h2 className="text-3xl font-bold text-muted-foreground">
                No Courses Found
              </h2>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={clearFilters} variant="default" className="mt-6">
                View All Courses
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-20 mb-10 p-8 bg-card rounded-xl border border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Not sure where to start?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our course advisors are here to help you choose the perfect learning path
          </p>
          <Button variant="default" size="lg">
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
