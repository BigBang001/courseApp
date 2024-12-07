import { toast } from "@/hooks/use-toast";
import axios from "axios";

export const createOrderId = async (amount: number, courseId: string) => {
  try {
    const response = await axios.post("/api/purchase/createOrder", {
      amount: amount * 100, // Convert to paisa
      courseId: courseId
    });

    
    if (response.status != 200) {
      toast({
        title: "Error",
        description: response.data
      })
    }
    return response.data.orderId;
  } catch (error: any) {
    console.error("Order creation error:", error);
    toast({
      title: "Error",
      description: error.message
    })
  }
};