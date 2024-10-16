"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({callbackUrl : "/signin"});
    // router.push("/signin")
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <header className="bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 md:p-6 py-4 rounded-2xl">
        <div className="px-5 flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">50xcourses</h1>
          <div className="flex items-center justify-between gap-2">
            {status === "loading" ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : session?.user ? (
              <div
                className="profile h-10 w-10 bg-neutral-300 font-semibold flex items-center justify-center uppercase rounded-full"
                aria-label="User profile"
              >
                {session.user.email?.[0]}
              </div>
            ) : null}
            <div>
              {status === "loading" ? (
                <Skeleton className="h-10 w-20" />
              ) : status === "authenticated" ? (
                <Button onClick={handleSignOut}>Logout</Button>
              ) : (
                <Button asChild>
                  <Link href="/signin">Sign in</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
