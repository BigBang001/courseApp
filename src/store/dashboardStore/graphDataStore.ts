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
    refreshGraphData: () => void
}

export const useGraphDataStore = create<graphDataStore>((set, get) => ({
    graphData: [],
    isLoading: false,
    fetchGraphData: async () => {
        if (get().graphData.length > 0) {
            return
        }
        try {
            set({ isLoading: true })
            const response = await axios.get("/api/dashboard/graph-data");
            set({ graphData: response.data.formattedData, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    },
    refreshGraphData: () => set({ graphData: [], isLoading: false })
}));
