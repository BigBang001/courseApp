"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminEarnings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/dashboard/balance");
        setBalance(response.data.balance.balance);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBalance();
  }, [setBalance]);

  return (
    <div>
      <p className="text-lg flex gap-1">
        Total Revenue:{" "}
        <span className="font-bold">
          {isLoading ? (
            <div className="flex font-normal text-neutral-700">
              <Loader2 className="animate-spin text-neutral-700" />
              Loading...
            </div>
          ) : (
            `₹${balance}`
          )}
        </span>
      </p>
      <p className="text-lg">
        This Month: <span className="font-bold">₹2,345</span>
      </p>
      <p className="text-lg">
        Pending Payout: <span className="font-bold">₹1,234</span>
      </p>
    </div>
  );
};

export default AdminEarnings;
