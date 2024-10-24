'use client'

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
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader2, LogOut, UserMinus } from "lucide-react"
import { signOut } from "next-auth/react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export default function AccountManage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")

  const handleDeactivateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`/api/deactivate-account`, { password })
      toast({
        title: "Account Deactivated",
        description: response.data.message || "Your account has been successfully deactivated.",
        variant: "success",
      })
      signOut({ callbackUrl: "/signin", redirect: true })
      setOpen(false)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred while deactivating your account."
      toast({
        title: "Deactivation Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin", redirect: true })
  }

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will be signed out of your account and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full flex items-center gap-2" variant="destructive" size="sm">
            <UserMinus className="h-4 w-4" />
            Deactivate Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Deactivate Account</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm  text-red-400 bg-red-950/10 rounded-md p-1 mb-4">
              <AlertTriangle/> Warning : Deactivating your account will permanently delete all your data, including your profile, posts, and settings. This action cannot be undone.
            </p>
            <form onSubmit={handleDeactivateAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password to confirm"
                  required
                />
              </div>
              <Button disabled={isLoading} type="submit" variant="destructive" className="w-full">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deactivating...
                  </div>
                ) : (
                  "Confirm Account Deactivation"
                )}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}