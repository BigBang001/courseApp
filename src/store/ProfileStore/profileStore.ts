import { User } from "@/types/UserTypes";
import { create } from "zustand";

interface ProfileStore {
    user: User | null
    isLoading: boolean
    fetchProfile: () => Promise<void>
}
export const useProfileStore = create<ProfileStore>((set) => ({
    user:  null,
    isLoading: true,
    fetchProfile: async () => {
        try {
            const response = await fetch("/api/me");
            const data = await response.json();
            set({ user: data.user, isLoading: false });
        } catch (error) {
            console.log(error);
        }
    }
}))
