"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const errors = []

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      errors.push("Email is required")
    } else if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address")
    }

    // Username validation
    if (!username) {
      errors.push("Username is required")
    } else if (username.length < 3) {
      errors.push("Username must be at least 3 characters long")
    }

    // Password validation
    if (!password) {
      errors.push("Password is required")
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters long")
    }

    // Password confirmation
    if (password !== confirmPassword) {
      errors.push("Passwords don't match")
    }

    if (errors.length > 0) {
      setError(errors.join(". "))
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/auth/signin")
        }, 1500)
      } else {
        setError(data.error || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-[420px] animate-fade-in">
        <div className="bg-white p-10 space-y-8 rounded-2xl shadow-lg">
          {/* Logo/Icon */}
          <div className="text-center">
            <div className="inline-block text-4xl">🔥</div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Join the fun!</h1>
          </div>

          {/* Success Message */}
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <p className="text-sm text-green-600">Account created successfully! Redirecting to sign in...</p>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </Alert>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-900"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:ring-2 focus:ring-primary"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-900"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full h-12 px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:ring-2 focus:ring-primary"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full h-12 px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:ring-2 focus:ring-primary"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-900"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full h-12 px-4 py-3 border rounded-lg text-base transition-all duration-200 focus:ring-2 focus:ring-primary"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 font-semibold text-base rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-medium text-primary hover:underline transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
