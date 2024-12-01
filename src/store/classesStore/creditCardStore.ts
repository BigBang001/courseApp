import { creditCardTypes } from "@/types/creditCardTypes";
import axios from "axios";
import { create } from "zustand";

interface creditCardStore {
    isLoadingCards: boolean,
    creditCards: creditCardTypes[],
    fetchCreditCards: () => Promise<void>
}

export const useCredicardBulkStore = create<creditCardStore>((set) => ({
    isLoadingCards: true,
    creditCards: [],
    fetchCreditCards: async () => {
        try {
            const response = await axios.get("/api/credit-card")
            set({ creditCards: response.data.cards, isLoadingCards: false })
        } catch (error) {
            console.log(error);
        }
    }
}))