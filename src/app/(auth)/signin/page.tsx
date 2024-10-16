"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import '@/app/globals.css'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        if (response.error === "CredentialsSignin") {
          toast({
            title: "Login Failed",
            description: "Incorrect username or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          });
        }
      }

      if (response?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while Signing in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    id="email"
                    placeholder="kushchaudhary@gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    id="password"
                    type="password"
                    placeholder="******"
                  />
                </div>
              </div>
            </div>
            <Button disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Signing...
                </span>
              ) : (
                "Signin"
              )}
            </Button>

            <Button onClick={() => signIn('github')}>Sign in with GitHub</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <h1>
            Not have an account?{" "}
            <Link href={"/signup"} className="text-blue-600 underline">
              signup
            </Link>
          </h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
