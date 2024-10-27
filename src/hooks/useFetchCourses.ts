import { Course } from "@/types/courseType";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchCourses = () => {
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            setIsSearching(true);
            try {
                const response = await axios.get(`/api/courses?filter=${encodeURIComponent(filter)}`);
                setCourses(response.data.courses);
                setIsLoading(false);
                setIsSearching(false)
            } catch (error) {
                console.log(error);
                setIsSearching(false)
                setIsLoading(false);
            }
        };
        fetchCards();
    }, [filter]);

    return { isLoading, courses, filter, setFilter , isSearching}
}