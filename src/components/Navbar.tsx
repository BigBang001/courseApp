"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const logo = session?.user?.image;
  const email = session?.user?.email;
  const name = session?.user?.name;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <header className="bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 md:p-6 py-4 rounded-2xl">
        <div className="px-5 flex items-center justify-between w-full">
          <h1 className="text-xl font-bold">50xcourses</h1>
          <div className="flex items-center justify-between gap-2">
            {/* {session?.user ? (
              <div
                className="profile h-10 w-10 bg-neutral-300 font-semibold flex items-center justify-center uppercase rounded-full"
                aria-label="User profile"
              >
                {session.user.image ? (
                  <img
                    className="h-full w-full object-cover"
                    src={session.user.image}
                    alt={`${session.user.name || "User"}'s profile picture`}
                  />
                ) : (
                  <span>{session.user.email?.[0].toUpperCase()}</span>
                )}
              </div>
            ) : null} */}
            <div>
              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg" asChild>
                      <div
                        className="profile overflow-hidden h-10 w-10 bg-neutral-300 font-semibold flex items-center justify-center uppercase rounded-full"
                        aria-label="User profile"
                      >
                        {logo ? (
                          <img
                            className="h-full w-full object-cover"
                            src={logo}
                            alt={`${name || "User"}'s profile picture`}
                          />
                        ) : (
                          <span>{email?.[0].toUpperCase()}</span>
                        )}
                      </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <Link href={`/profile/${session.user?.name}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4 text-red-600" />
                      <span className="text-red-600">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
