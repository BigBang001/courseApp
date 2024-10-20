import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios"; import { useToast } from "./use-toast";
import { Course } from "@/types/courseType";
; 

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const fetchCourses = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/user-courses");
            setCourses(response.data.courses);
        } catch (error) {
            const axiosError = error as AxiosError;
            toast({
                title: "Error",
                description: axiosError.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return {
        courses,
        isLoading,
        refetch: fetchCourses,
    };
};
