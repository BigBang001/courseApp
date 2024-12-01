import axios from "axios";
import { create } from "zustand";

interface graphData {
    month: string
    revenue: number
}

interface graphDataStore {
    isLoading: boolean,
    fetchGraphData: () => Promise<void>
    graphData: graphData[]
}

export const useGraphDataStore = create<graphDataStore>((set) => ({
    graphData: [],
    isLoading: false,
    fetchGraphData: async () => {
        try {
            set({ isLoading: true })
            const response = await axios.get("/api/dashboard/graph-data");
            set({ graphData: response.data.formattedData, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    },
}));
