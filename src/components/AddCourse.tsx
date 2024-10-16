"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: 0,
    duration: "",
  });

  const handleSubmit = async () => {};
  return (
    <div className="mx-10">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Add Course
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title of the course"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                required
              />
            </div>
            {/* todo : md format */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Description of the course"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration Of the course</Label>
                <Input
                  id="duration"
                  type="text"
                  placeholder="1 Month"
                  value={values.duration}
                  onChange={(e) =>
                    setValues({ ...values, duration: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="99.99"
                  value={values.price}
                  onChange={(e) =>
                    setValues({ ...values, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                id="thumbnail"
                type="text"
                placeholder="Thumbnail image link"
                value={values.thumbnail}
                onChange={(e) =>
                  setValues({ ...values, thumbnail: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCourse;
