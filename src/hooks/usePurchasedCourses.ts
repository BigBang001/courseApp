import { Course } from "@/types/courseType";
import axios from "axios";
import { useEffect, useState } from "react";


export const usePurchasedCourses = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`/api/purchase`);
                setPurchasedCourses(response.data.purchasedCourses);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchCards();
    }, [setPurchasedCourses]);

    return { isLoading, purchasedCourses }
}