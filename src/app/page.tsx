"use client"
import "@/app/globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <Navbar />
      <div className="dark:bg-background w-full bg-primary-foreground overflow-x-hidden">
        <main className="relative z-10 md:mt-32 mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to
            <br />
            <span className="bg-gradient-to-r text-4xl md:text-8xl from-blue-500 to-white text-transparent bg-clip-text">
              50xCourses
            </span>
          </h1>
          <p className="mt-6 text-sm md:text-xl dark:text-neutral-400 max-w-3xl mx-auto">
            "Unlock your potential with expert-led courses—where knowledge meets
            opportunity, empowering you to multiply your skills for growth,
            success, and fulfillment in your career."
          </p>
          <div className="mt-10">
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Link href={"/signup"}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-white text-black hover:bg-neutral-200"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-20">
            <h2 className="md:text-2xl text-lg font-semibold text-center dark:text-white mb-8">
              Trusted by leading companies
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <img
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/WNmYnN33P-81WgMcwlDKQXxypuypMVEcihrqyg27o_s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3ZjljYmNlZjEw/MTRjMGI1ZTQ4Yzgu/cG5n"
                alt="Google"
              />
              <img
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/Xtc9cnu7MSp8MJG-CMd1STPUHKhnmtGOtqxendOBapg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWV0YS9tZXRh/X1BORzUucG5n"
                alt="Meta"
              />
              <img
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/R9W6ytA6CRPIO6CcQwJpXjtre717-s3x4uBEb_46awU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc"
                alt="Microsoft"
              />
              <img
                src="https://imgs.search.brave.com/aPrgxBXWSqklQUlX7PSqgmQ9VqY0covqRmtewWNuKYc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzE5MjM0LnBuZw"
                alt="Apple"
                className="invert dark:invert-0 w-6 md:w-10 animate-bounce duration-2000"
              />
              <img
                className="invert dark:invert-0 w-6 md:w-10 animate-bounce duration-2000"
                src="https://imgs.search.brave.com/54_CDPZ-ydG19HDJmLYAkr8UkSkdkKVwGddySwD_vyE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw"
                alt="Amazon"
              />
              <img
                src="https://imgs.search.brave.com/XDxKHAa94hPoQlfKtBX8vLshViu-Xzzc6kp0ZHvLULg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDE5Lzk1/Ni8xOTUvbm9uXzJ4/L25ldGZsaXgtdHJh/bnNwYXJlbnQtbmV0/ZmxpeC1mcmVlLWZy/ZWUtcG5nLnBuZw"
                alt="Netflix"
                className="animate-bounce w-6 md:w-10 duration-2000"
              />
            </div>
          </div>
        </main>
        <footer className="py-4 mx-auto flex items-center w-full justify-center">
          <div className="container dark:bg-neutral-900 dark:bg-opacity-70 bg-neutral-200 p-4 border dark:border-neutral-800 bg-opacity-35 rounded-lg w-full ">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h2 className="text-2xl font-bold">50xOpportunities</h2>
                <p className="text-neutral-400 mt-2">
                  Where Opportunities Multiply
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">50x Links</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      App
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      Report
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">50x Legal</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      Refund & Cancellation
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-neutral-400">
                &copy; 2024 50xOpportunities. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="">
                  <InstagramLogoIcon />
                </a>
                <a href="https://github.com/hanuchaudhary" target="_blank">
                  <GitHubLogoIcon />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
