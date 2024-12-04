
export const createOrderId = async (amount: number) => {
  try {
    const response = await fetch("/api/purchase/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paisa
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order. Please try again.");
    }

    const data = await response.json();;
    return data.orderId;
  } catch (error: any) {
    console.error("Order creation error:", error);
    alert(error.message || "Something went wrong while creating the order.");
    throw error;
  }
};