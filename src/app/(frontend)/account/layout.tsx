import { Metadata } from "next";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and payment information",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container px-3 max-w-4xl mx-auto md:py-10 py-4">
      <div className="py-2">
        <BackButton href="/explore" title="Back to courses" />
      </div>
      <h1 className="text-3xl font-bold font-serif">Account Settings</h1>
      <p className="mb-6 text-sm text-neutral-500 font-serif">
        Fill all the details below to manage your account settings and payment
        information.
      </p>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile" asChild>
            <Link href="/account/profile">Profile</Link>
          </TabsTrigger>
          <TabsTrigger value="bank" asChild>
            <Link href="/account/bank">Bank Account</Link>
          </TabsTrigger>
          <TabsTrigger value="paypal" asChild>
            <Link href="/account/paypal">PayPal</Link>
          </TabsTrigger>
        </TabsList>
        <div className="dark:bg-neutral-900 bg-neutral-100 rounded-lg p-3">
          {children}
        </div>
      </Tabs>
    </div>
  );
}
