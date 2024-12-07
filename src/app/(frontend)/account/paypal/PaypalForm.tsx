"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/LoadingButton";

const paypalFormSchema = z.object({
  paypalEmail: z.string().email({
    message:
      "Please provide a valid PayPal email address in the correct format (e.g., name@example.com).",
  }),
});

type PayPalFormValues = z.infer<typeof paypalFormSchema>;

const defaultValues: Partial<PayPalFormValues> = {
  paypalEmail: "",
};

export default function PayPalForm() {
  const form = useForm<PayPalFormValues>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues,
  });

  function onSubmit(data: PayPalFormValues) {
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
        <FormField
          control={form.control}
          name="paypalEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PayPal Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your PayPal email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The email address associated with your PayPal account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={false}
          loadingTitle="Adding Email"
          title="Add Paypal Email"
          type="submit"
        />
      </form>
    </Form>
  );
}
