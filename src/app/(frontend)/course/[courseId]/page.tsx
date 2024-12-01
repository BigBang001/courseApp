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
import { CreditCard, Loader2, Plus, Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleCourse from "@/components/SingleCourse";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { creditCardSValidation } from "@/validations/validation";
import { useCredicardBulkStore } from "@/store/classesStore/creditCardStore";

export default function CoursePurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvv, setCvv] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("existing-card");
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { creditCards, fetchCreditCards, isLoadingCards } =
    useCredicardBulkStore();

  const form = useForm<z.infer<typeof creditCardSValidation>>({
    resolver: zodResolver(creditCardSValidation),
    defaultValues: {
      accountNumber: "",
      bankName: "",
      cvv: "",
      expiryDate: "",
      cardHolderName: "",
    },
  });

  const handleAddCard = async (
    values: z.infer<typeof creditCardSValidation>
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/credit-card`, values);
      if (response.status === 201) {
        toast({
          title: "Added",
          description: "Card Added Successfully",
          variant: "success",
        });
      }
      fetchCreditCards();
      setIsDialogOpen(false);
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

  useEffect(() => {
    fetchCreditCards();
  }, []);

  const handleDeleteCreditCard = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/credit-card/${id}`);
      if (response.status === 200) {
        toast({
          title: "Deleted",
          description: response.data.message || "Course Deleted Succesfully",
          variant: "success",
        });
      }
      fetchCreditCards();
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

  const param = useParams();

  const handlePurchase = async (
    event: React.FormEvent,
    creditCardId: string
  ) => {
    event.preventDefault();
    try {
      setIsPurchasing(true);
      const response = await axios.post(
        `/api/courses/purchase/${creditCardId}`,
        {
          courseId: param.courseId,
          cvv,
        }
      );

      toast({
        title: "Purchased",
        description: response.data.message || "Course Purchased Successfully",
        variant: "success",
      });
      setIsDialogOpen(false);
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

        {paymentMethod === "existing-card" && isLoadingCards ? (
          <div className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ) : paymentMethod === "existing-card" && creditCards.length > 0 ? (
          creditCards.map((e) => (
            <Card className="mb-2" key={e.id}>
              <CardHeader className="flex justify-between flex-row">
                <div>
                  <CardTitle>User Credit Cards</CardTitle>
                  <CardDescription>Account details:</CardDescription>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Complete Purchase</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Confirm Payment</DialogTitle>
                        <DialogDescription>
                          Please confirm your payment to purchase the course.
                        </DialogDescription>
                      </DialogHeader>
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
                        <DialogFooter>
                          <Button type="submit" disabled={isPurchasing}>
                            {isPurchasing ? (
                              <div className="flex items-center gap-1">
                                <Loader2 className="animate-spin" />
                                Purchasing...
                              </div>
                            ) : (
                              "Confirm Payment"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 className="text-red-100" />
                    )}
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
                  Expiry : <span className="font-semibold">{e.expiryDate}</span>
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
        )}

        {paymentMethod === "new-card" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Add New Card</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Credit Card</DialogTitle>
                <DialogDescription>
                  <h1 className="flex bg-red-400/5 p-1 text-sm gap-1 rounded-lg text-red-950 font-semibold">
                    <TriangleAlert /> Don't use your Real Credit Card details
                    this is just Prototype
                  </h1>
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleAddCard)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Kush Chaudhary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM/YY or MM/YYYY format"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Bank" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Bank</SelectLabel>
                                {banks.map((bank) => (
                                  <SelectItem key={bank.name} value={bank.name}>
                                    {bank.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" maxLength={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button disabled={isLoading} type="submit">
                      {isLoading ? (
                        <div className="flex gap-1 items-center">
                          <Loader2 className="animate-spin" />
                          Adding...
                        </div>
                      ) : (
                        "Add Card"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
