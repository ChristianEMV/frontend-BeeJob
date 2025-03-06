"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "./LoginForm"
import { login } from "../../services/authService"
import Swal from "sweetalert2"
import "./login.css"

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsAdmin: (isAdmin: boolean) => void
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      const role = localStorage.getItem("role")

      // If remember me is checked, store the email in localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      setIsAuthenticated(true)
      setIsAdmin(role === "ADMIN")

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
        background: "#ffffff",
        confirmButtonColor: "#1B0096",
      }).then(() => {
        navigate(role === "ADMIN" ? "/adminHome" : "/home")
      })
    } catch (error) {
      setError((error as any).message)
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: (error as any).message,
        background: "#ffffff",
        confirmButtonColor: "#1B0096",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail")
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="login-background">
      <div className="login-container">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
          rememberMe={rememberMe}
          onRememberMeChange={handleRememberMeChange}
        />
      </div>
    </div>
  )
}

export default Login

