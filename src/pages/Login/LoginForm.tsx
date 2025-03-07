"use client"

import type React from "react"
import { useState } from "react"
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Paper,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"

interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
  error: string
  isLoading: boolean
  rememberMe: boolean
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
  isLoading,
  rememberMe,
  onRememberMeChange,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }

    setEmailError("")
    return true
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (isEmailValid && isPasswordValid) {
      onSubmit(e)
    }
  }

  return (
    <Paper
      elevation={8}
      className={styles.loginformpaper}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "450px",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={styles.loginformcontainer}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          width: "100%",
          padding: { xs: 3, sm: 4 },
          backgroundColor: "white",
        }}
      >
        <div className={styles.logocontainer}>
          <img src="/assets/WI1_500px.png" alt="LogoBeeJop" className={styles.logo} />
        </div>

        <Typography variant="h4" component="h1" className={styles.welcometext}>
          Welcome back!
        </Typography>

        <Typography variant="body1" className={styles.subtitletext}>
          Please enter your credentials to continue
        </Typography>

        {error && (
          <Box className={styles.errorcontainer}>
            <Typography color="error" className={styles.errormessage}>
              {error}
            </Typography>
          </Box>
        )}

        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            onEmailChange(e)
            if (emailError) validateEmail(e.target.value)
          }}
          onBlur={(e) => validateEmail(e.target.value)}
          fullWidth
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          className={styles.forminput}
          sx={{
            "& .MuiInputLabel-root": { color: emailError ? "error.main" : "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: emailError ? "error.main" : "#1B0096" },
              "&:hover fieldset": { borderColor: emailError ? "error.main" : "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: emailError ? "error.main" : "#1B0096" },
            },
          }}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            onPasswordChange(e)
            if (passwordError) validatePassword(e.target.value)
          }}
          onBlur={(e) => validatePassword(e.target.value)}
          fullWidth
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          className={styles.forminput}
          sx={{
            "& .MuiInputLabel-root": { color: passwordError ? "error.main" : "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: passwordError ? "error.main" : "#1B0096" },
              "&:hover fieldset": { borderColor: passwordError ? "error.main" : "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: passwordError ? "error.main" : "#1B0096" },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={onRememberMeChange}
                sx={{
                  color: "#1B0096",
                  "&.Mui-checked": {
                    color: "#1B0096",
                  },
                }}
              />
            }
            label="Remember me"
            sx={{ color: "#555" }}
          />

          <Link to="/forgot-password" className={styles.forgotpasswordlink}>
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          className={styles.loginbutton}
          sx={{
            py: 1.5,
            mt: 1,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "all 0.5s",
            },
            "&:hover::after": {
              left: "100%",
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.signuplink}>
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Paper>
  )
}

export default LoginForm

