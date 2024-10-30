import { Course } from "@/types/courseType";
import axios from "axios";
import { useEffect, useState } from "react";


export const useSavedCourses = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [savedCourses, setSavedCourses] = useState<Course[]>([]);
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`/api/courses/bookmark`);
                setSavedCourses(response.data.savedCourses);
                setIsLoading(false);
                // console.log(response.data.savedCourses);
                
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchCards();
    }, [setSavedCourses]);

    return { isLoading, savedCourses }
}