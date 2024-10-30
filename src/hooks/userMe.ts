import axios from "axios";
import { useEffect, useState } from "react";

interface userData {
    image: string;
    bio: string;
}
export const useMe =  () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<userData>();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get("/api/me");
                setUser(response.data.user);
                setIsLoading(false);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [setUser]);

    return { user, isLoading }
}