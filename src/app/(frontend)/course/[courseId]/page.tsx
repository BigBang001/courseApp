"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { CreditCard, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleCourse from "@/components/SingleCourse";
import { creditCardTypes } from "@/types/creditCardTypes";
import { useToast } from "@/hooks/use-toast";
import banks from "@/data/banks.json";
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
import { useParams } from "next/navigation";

export default function CoursePurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("existing-card");
  const { toast } = useToast();
  const [cards, setCards] = useState<creditCardTypes[]>([]);
  const [values, setValues] = useState<creditCardTypes>({
    accountNumber: "",
    bankName: "",
    cvv: "",
    expiryDate: "",
    cardHolderName: "",
  });

  const handleAddCard = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  const param = useParams();
  const handlePurchase = async (
    event: React.FormEvent,
    creditCardId: string
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/purchase/${creditCardId}`, {
        courseId: param.courseId,
        cvv,
      });

      toast({
        title: "Purchased",
        description: response.data.message,
      });

      fetchCards();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
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
              <Card className="mb-2" key={e.id}>
                <CardHeader className="flex justify-between flex-row">
                  <div>
                    <CardTitle>User Credit Cards</CardTitle>
                    <CardDescription>Account details:</CardDescription>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Complete Purchase</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="sm:max-w-[425px]">
                        <div>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please confirm your payment to purchase the
                              course.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <form
                            onSubmit={(event) =>
                              handlePurchase(event, e.id as string)
                            }
                          >
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                <CreditCard className="h-6 w-6 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">
                                    Card ending in{" "}
                                    {e.accountNumber.substring(12, 16)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Expires {e.expiryDate}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cvv" className="text-right">
                                  CVV
                                </Label>
                                <Input
                                  id="cvv"
                                  type="password"
                                  className="col-span-3"
                                  placeholder="Enter CVV"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                  required
                                  maxLength={4}
                                />
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                type="submit"
                                disabled={isPurchasing}
                              >
                                {isPurchasing
                                  ? "Processing..."
                                  : "Confirm Payment"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </form>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
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
                      {e.accountNumber.substring(0, 4)} •••• ••••{" "}
                      {e.accountNumber.substring(12, 16)}
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
              <form onSubmit={handleAddCard}>
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
                  <div className="grid grid-cols-2  gap-4">
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
                            {banks.map((e) => (
                              <SelectItem
                                key={e.name}
                                className="capitalize"
                                value={e.name}
                              >
                                {e.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        value={values.cvv}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            cvv: e.target.value,
                          })
                        }
                        id="cvv"
                        placeholder="123"
                        max={3}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 w-full">
                  <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading ? "Adding" : "Add Card"}
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
