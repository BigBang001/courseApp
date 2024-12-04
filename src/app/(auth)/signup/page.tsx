"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, X, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { signupValidation } from "@/validations/validation";

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: 'USER',
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      const response = await axios.post(`/api/signup`, values);
      toast({
        title: "Registered",
        description: response.data.message || "User Registered successfully",
        variant: "default",
      });

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.ok) {
        router.replace("/explore");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex px-2 items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg relative">
        <Link href="/" className="absolute right-4 top-4">
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </Link>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Kush Chaudhary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="kushchaudhary@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
