"use client";
import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Apple } from "lucide-react";

export default function LandingPage() {
  return (
    <div className={`min-h-screen flex flex-col`}>
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className={`text-4xl md:text-8xl font-serif mt-10 font-bold mb-4`}>
          Welcome to <span className="text-blue-500">50xCourse</span>
        </h2>
        <p className={`text-xl text-stone-400 md:text-lg mb-8 max-w-2xl`}>
          "Unlock your potential with expert-led courses—where knowledge meets
          opportunity, empowering you to multiply your skills for growth,
          success, and fulfillment in your career."
        </p>
        <Link
          href="/courses"
          className={`px-8 py-3 rounded-md text-lg font-semibold hover:bg-opacity-90 transition duration-200`}
        >
          Explore Courses
        </Link>

        <div className="mt-16">
          <h3 className={`text-xl mb-4`}>
            Trusted by over 16,000 companies and millions of learners around the
            world
          </h3>
          <div className="flex justify-center items-center space-x-8">
            {[
              
            ].map((company) => (
              <div key={company} className="w-12 h-12 relative">
                <Image
                  src={company}
                  alt="logo"
                  width={48}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={`w-full p-4 text-center `}>
        <h3 className="text-2xl font-semibold mb-2">Choose Your Path</h3>
        <p>
          Explore our wide range of courses and start your learning journey
          today!
        </p>
      </footer>
    </div>
  );
}
