'use client'

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Github } from "lucide-react"
import '@/app/globals.css'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function SignInPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (response?.error) {
        if (response.error === "CredentialsSignin") {
          toast({
            title: "Login Failed",
            description: "Incorrect email or password",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Error",
            description: response.error,
            variant: "destructive",
          })
        }
      } else if (response?.url) {
        router.replace("/explore")
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex items-center px-2 justify-center min-h-screen bg-popover">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="py-1">Sign In</CardTitle>
          <CardDescription >
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don't have an account?
            <Link
              href="/signup"
              className={cn(
                "font-medium text-primary underline underline-offset-4 hover:text-neutral-400 transition-colors"
              )}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}