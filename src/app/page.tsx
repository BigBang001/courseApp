"use client"
import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default async function LandingPage() {
  const featuredCourses = [
    {
      title: "Complete Web Development Bootcamp",
      description: "Learn full-stack web development from scratch",
      price: "₹1199",
      image: "https://imgs.search.brave.com/bCpPEOntXSbX81704d8RG--GaJPpMiEYaNwk0pu9_OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvYW5pbWUtbGFu/ZHNjYXBlLWNrbDl2/cTlldG9wdGhxNmUu/anBn"
    },
    {
      title: "Advanced React & Next.js",
      description: "Master modern React patterns and Next.js features",
      price: "₹1179",
      image: "https://imgs.search.brave.com/bCpPEOntXSbX81704d8RG--GaJPpMiEYaNwk0pu9_OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvYW5pbWUtbGFu/ZHNjYXBlLWNrbDl2/cTlldG9wdGhxNmUu/anBn"
    },
    {
      title: "Python for Data Science",
      description: "Comprehensive data science with Python",
      price: "₹1189",
      image: "https://imgs.search.brave.com/dxstLZnjRmQgqaAug1GNBGDlDWT7q0zPjV0Y47lxPVA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS82Mi81/Ny9VRFd2cGouanBn"
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col`}>
      <div className="dark:bg-background w-full bg-primary-foreground overflow-x-hidden">
        <main className="relative z-10 md:mt-20 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to
            <br />
            <span className="bg-gradient-to-r text-4xl md:text-8xl from-blue-500 to-white text-transparent bg-clip-text">
            CoursePros
            </span>
          </h1>
          <p className="mt-6 text-sm md:text-xl dark:text-neutral-400 max-w-3xl mx-auto">
            "Transform your career with our expert-led courses. Join thousands of successful learners who have accelerated their careers through our comprehensive learning platform."
          </p>
          <div className="mt-10">
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
              <Link href={"/signup"}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-white text-black hover:bg-neutral-200"
                >
                  Start Learning Now
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Featured Courses Section */}
          <div className="mt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <Card key={index} className="overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-48">
                    <Image 
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-neutral-400 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{course.price}</span>
                      <Link href="/signin">
                        <Button variant="outline">Enroll Now</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="md:text-2xl text-lg font-semibold text-center dark:text-white mb-8">
              Trusted by Industry Leaders
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <Image
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/WNmYnN33P-81WgMcwlDKQXxypuypMVEcihrqyg27o_s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3ZjljYmNlZjEw/MTRjMGI1ZTQ4Yzgu/cG5n"
                alt="Google"
                width={40}
                height={40}
              />
              <Image
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/Xtc9cnu7MSp8MJG-CMd1STPUHKhnmtGOtqxendOBapg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWV0YS9tZXRh/X1BORzUucG5n"
                alt="Meta"
                width={40}
                height={40}
              />
              <Image
                className="animate-bounce w-6 md:w-10 duration-2000"
                src="https://imgs.search.brave.com/R9W6ytA6CRPIO6CcQwJpXjtre717-s3x4uBEb_46awU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc"
                alt="Microsoft"
                width={40}
                height={40}
              />
              <Image
                src="https://imgs.search.brave.com/aPrgxBXWSqklQUlX7PSqgmQ9VqY0covqRmtewWNuKYc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzE5MjM0LnBuZw"
                alt="Apple"
                className="invert dark:invert-0 w-6 md:w-10 animate-bounce duration-2000"
                width={40}
                height={40}
              />
              <Image
                className="invert dark:invert-0 w-6 md:w-10 animate-bounce duration-2000"
                src="https://imgs.search.brave.com/54_CDPZ-ydG19HDJmLYAkr8UkSkdkKVwGddySwD_vyE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw"
                alt="Amazon"
                width={40}
                height={40}
              />
              <Image
                src="https://imgs.search.brave.com/XDxKHAa94hPoQlfKtBX8vLshViu-Xzzc6kp0ZHvLULg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDE5Lzk1/Ni8xOTUvbm9uXzJ4/L25ldGZsaXgtdHJh/bnNwYXJlbnQtbmV0/ZmxpeC1mcmVlLWZy/ZWUtcG5nLnBuZw"
                alt="Netflix"
                className="animate-bounce w-6 md:w-10 duration-2000"
                width={40}
                height={40}
              />
            </div>
          </div>
        </main>
        <footer className="py-4 px-2 flex items-center w-full justify-center">
          <div className="container dark:bg-neutral-900 dark:bg-opacity-70 bg-neutral-200 p-4 border dark:border-neutral-800 bg-opacity-35 rounded-lg w-full ">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h2 className="text-2xl font-bold">50xOpportunities</h2>
                <p className="text-neutral-400 mt-2">
                  Where Learning Leads to Success
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Quick Links</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link href="/explore" className="text-neutral-400 hover:text-white">
                      Browse Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-neutral-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Legal</h3>
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
                      Refund Policy
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
