"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User, LogOut, Moon, Sun, LucideEdit, IndianRupee } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <header className="bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-primary/10 md:p-6 py-4 rounded-2xl">
        <div className="px-5 flex items-center justify-between w-full">
          <Link href={"/explore"}>
            <h1 className="text-xl font-bold">50xcourses</h1>
          </Link>

          <div className="flex items-center justify-between gap-2">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Switch>
            <div>
              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
                    asChild
                  >
                    <div
                      className="profile overflow-hidden h-10 w-10 bg-neutral-300 font-semibold flex items-center justify-center uppercase rounded-full"
                      aria-label="User profile"
                    >
                      {session.user.image ? (
                        <Image
                          className="h-full w-full object-cover"
                          src={session.user.image}
                          alt={`${"User"}'s profile picture`}
                        />
                      ) : (
                        <span>{session.user.fullName?.[0].toUpperCase()}</span>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/profile/${session.user?.fullName}`}>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    {session.user.role === "admin" ? (
                      <Link href={"/create/addcourse"}>
                        <DropdownMenuItem>
                          <LucideEdit className="mr-2 h-4 w-4" />
                          <span>Add Course</span>
                        </DropdownMenuItem>
                      </Link>
                    ) : (
                      <Link href={"/purchased"}>
                        <DropdownMenuItem>
                          <IndianRupee className="mr-2 h-4 w-4" />
                          <span>Purchased Courses</span>
                        </DropdownMenuItem>
                      </Link>
                    )}
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
