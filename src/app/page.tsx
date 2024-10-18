'use client'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import '@/app/globals.css'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gradient-to-b f' : 'bg-gradient-to-b f to-white'}`}>
      <header className="w-full p-4 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 't'}`}>CourseMaster</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-opacity-20">
            {theme === 'dark' ? <Sun className="text-white" /> : <Moon className="t" />}
          </button>
          <Link
            href="/signup"
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:bg-opacity-90 transition duration-200`}
          >
            Signup
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 't'}`}>
          Welcome to <span className="text-blue-500">CourseMaster</span>
        </h2>
        <p className={`text-xl md:text-2xl mb-8 max-w-2xl ${theme === 'dark' ? 't' : 't'}`}>
          "Unlock your potential with expert-led courses—where knowledge meets opportunity, empowering you to multiply your skills for growth, success, and fulfillment in your career."
        </p>
        <Link
          href="/courses"
          className={`px-8 py-3 rounded-md text-lg font-semibold ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:bg-opacity-90 transition duration-200`}
        >
          Explore Courses
        </Link>

        <div className="mt-16">
          <h3 className={`text-xl mb-4 ${theme === 'dark' ? 't' : 't'}`}>Trusted by leading companies</h3>
          <div className="flex justify-center items-center space-x-8">
            {['google', 'meta', 'microsoft', 'apple', 'twitter', 'netflix'].map((company) => (
              <div key={company} className="w-12 h-12 relative">
                <Image
                  src={`/placeholder.svg?height=48&width=48`}
                  alt={`${company} logo`}
                  width={48}
                  height={48}
                  className={`${theme === 'dark' ? 'filter invert' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={`w-full p-4 text-center ${theme === 'dark' ? 't' : 't'}`}>
        <h3 className="text-2xl font-semibold mb-2">Choose Your Path</h3>
        <p>Explore our wide range of courses and start your learning journey today!</p>
      </footer>
    </div>
  )
}