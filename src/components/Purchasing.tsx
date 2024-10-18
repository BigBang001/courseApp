import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreditCard, Apple } from "lucide-react";

const Purchasing = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger >
          <Button>Add Bank</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-0 border-none">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Payment Method</CardTitle>
              <CardDescription>
                Add a new payment method to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <RadioGroup
                  defaultValue="card"
                  className="grid grid-cols-3 gap-4 mb-6"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                    >
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span>Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="paypal"
                      id="paypal"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                    >
                      <svg
                        className="h-6 w-6 mb-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.015-2.59 4.686-5.693 4.686h-2.19a1.28 1.28 0 0 0-1.266 1.09l-1.12 7.106c-.022.133-.158.232-.295.232H7.076L8.17 13.72c.022-.133.157-.232.294-.232h2.395c4.266 0 7.6-1.733 8.588-6.754a6.16 6.16 0 0 0 .098-.496c.29-1.972-.153-3.178-1.322-4.32z" />
                      </svg>
                      <span>Paypal</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="apple"
                      id="apple"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="apple"
                      className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                    >
                      <Apple className="h-6 w-6 mb-2" />
                      <span>Apple</span>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="First Last" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card number</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expires-month">Expires</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${i + 1}`.padStart(2, "0")}
                            >
                              {`${i + 1}`.padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expires-year">
                        Year
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue id="expires-year" placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="CVC" />
                    </div>
                  </div>
                </div>
                <div className="flex  gap-2 flex-col">
                  <AlertDialogAction className="w-full mt-6">Continue</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </div>
              </form>
            </CardContent>
          </Card>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Purchasing;
