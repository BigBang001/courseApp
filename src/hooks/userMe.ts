import axios from "axios";
import { useEffect, useState } from "react";

interface userData {
    image: string;
    bio: string;
}
export const useMe =  () => {
    const [user, setUser] = useState<userData>();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get("/api/me");
                setUser(response.data.user);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [setUser]);

    return { user }
}