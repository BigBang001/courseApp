"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleCourse from "@/components/SingleCourse";
import { creditCardTypes } from "@/types/creditCardTypes";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CoursePurchase() {
  const [paymentMethod, setPaymentMethod] = useState("existing-card");
  const { toast } = useToast();
  const [cards, setCards] = useState<creditCardTypes[]>([]);
  const [values, setValues] = useState<creditCardTypes>({
    accountNumber: "",
    bankName: "",
    cvv: 0,
    expiryDate: "",
    cardHolderName: "",
  });

  const handlePurchase = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/credit-card`, values);
      if (response.status === 201) {
        toast({
          title: "Added",
          description: response.data.message,
        });
      }
      fetchCards();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get(`/api/credit-card`);
      setCards(response.data.cards);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, [setCards]);

  const handleDeleteCreditCard = async (id: string) => {
    try {
      const response = await axios.delete(`/api/credit-card/${id}`);
      if (response.status === 200) {
        toast({
          title: "Deleted",
          description: response.data.message,
        });
        fetchCards();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="md:w-[90%] w-[100%] gap-2 md:flex mx-auto p-4">
      <div className="mb-2 md:w-[40%]">
        <SingleCourse />
      </div>
      <div className="w-full">
        <Card className="mb-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="existing-card"
              onValueChange={setPaymentMethod}
              className="grid gap-4"
            >
              <div>
                <RadioGroupItem
                  value="existing-card"
                  id="existing-card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="existing-card"
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Use Existing Card
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="new-card"
                  id="new-card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="new-card"
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Card
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {paymentMethod === "existing-card" &&
          (cards.length > 0 ? (
            cards.map((e) => (
              <Card className="mb-2">
                <CardHeader className="flex justify-between flex-row">
                  <div>
                    <CardTitle>User Credit Cards</CardTitle>
                    <CardDescription>Account details:</CardDescription>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button size={"sm"} className="font-semibold">
                      Select
                    </Button>
                    <Button
                      onClick={() => {
                        if (e.id) {
                          handleDeleteCreditCard(e.id);
                        } else {
                          toast({
                            title: "Error",
                            description: "Credit card ID is not available.",
                            variant: "destructive",
                          });
                        }
                      }}
                      size={"sm"}
                      variant={"destructive"}
                    >
                      <Trash2 className="text-red-100" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h1 className="capitalize">
                    Account Holder :{" "}
                    <span className="font-semibold">{e.cardHolderName}</span>
                  </h1>
                  <h1 className="capitalize">
                    Bank : <span className="font-semibold">{e.bankName}</span>
                  </h1>
                  <h1>
                    Account Number :{" "}
                    <span className="font-semibold">
                      •••• •••• •••• {e.accountNumber.substring(12, 18)}
                    </span>
                  </h1>
                  <h1>
                    Expiry :{" "}
                    <span className="font-semibold">{e.expiryDate}</span>
                  </h1>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="p-2 border rounded-lg shadow-sm">
              <h1 className="font-semibold">No Cards Available</h1>
              <h1 className="text-neutral-400">
                Add Credit Card to purchase Course.
              </h1>
            </div>
          ))}

        {paymentMethod === "new-card" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Add Credit Card
              </CardTitle>
              <CardDescription>Fill all card details carefully</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        value={values.accountNumber}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            accountNumber: e.target.value,
                          })
                        }
                        id="account-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Card holder name</Label>
                      <Input
                        value={values.cardHolderName}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cardHolderName: e.target.value,
                          })
                        }
                        id="name"
                        placeholder="Kush Chaudhary"
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        value={values.expiryDate}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            expiryDate: e.target.value,
                          })
                        }
                        placeholder="MM/YY or MM/YYYY format"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Bank Name</Label>
                      <Select
                        value={values.bankName}
                        onValueChange={(value) =>
                          setValues({ ...values, bankName: value })
                        }
                      >
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Role</SelectLabel>
                            {[
                              "HDFC Bank",
                              "State bank of india",
                              "Canara Bank",
                              "Axis bank",
                              "Punjab national bank",
                              "induslnd bank",
                              "HSBC bank",
                            ].map((e) => (
                              <SelectItem className="capitalize" value={e}>
                                {e}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        max={3}
                        value={Number(values.cvv)}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cvv: Number(e.target.value),
                          })
                        }
                        id="cvv"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 w-full">
                  <Button type="submit" className="w-full">
                    Add Card
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
