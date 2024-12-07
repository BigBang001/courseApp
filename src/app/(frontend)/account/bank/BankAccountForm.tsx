"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useProfileStore } from "@/store/ProfileStore/profileStore";
import LoadingButton from "@/components/LoadingButton";

const bankAccountFormSchema = z.object({
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  accountHolderName: z.string().min(2, {
    message: "Account holder name must be at least 2 characters long.",
  }),
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 characters long and numeric.",
  }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message:
      "IFSC code must be exactly 11 characters long and follow the format: 4 letters, the digit 0, and 6 alphanumeric characters.",
  }),
});

type BankAccountFormValues = z.infer<typeof bankAccountFormSchema>;

export default function BankAccountForm() {
  const { user } = useProfileStore();

  const defaultValues: Partial<BankAccountFormValues> = {
    bankName: user?.role || "",
    ifscCode: user?.bankAccount.ifscCode || "",
    accountNumber: user?.bankAccount.accountNumber || "",
    accountHolderName: user?.bankAccount.accountHolderName || "",
  };

  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BankAccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Kush Chaudhary" {...field} />
                </FormControl>
                <FormDescription>
                  The name as it appears on your bank account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your account number"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your bank account number (typically 11-16 digits)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank IFSC Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your bank IFSC code" {...field} />
                </FormControl>
                <FormDescription>
                  11-character code that uniquely identifies your bank branch
                  (e.g., SBIN0001234)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          type="submit"
          isLoading={false}
          loadingTitle="Saving"
          title="Save Bank Account"
        />
      </form>
    </Form>
  );
}
