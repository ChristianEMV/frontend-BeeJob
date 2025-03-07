"use client"

import type React from "react"
import { useState } from "react"
import { TextField, Button, Box, Typography, InputAdornment, Paper, Divider, CircularProgress } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import BadgeIcon from "@mui/icons-material/Badge"
import { register } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import styles from "./styles.module.css"

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState("")
  const [firstLastName, setFirstLastName] = useState("")
  const [secondLastName, setSecondLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)
  const handleFirstLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstLastName(e.target.value)
  const handleSecondLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSecondLastName(e.target.value)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      await register(fullName, firstLastName, secondLastName, email, password)
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
        confirmButtonColor: "#1B0096",
      }).then(() => {
        navigate("/login")
      })
    } catch (error) {
      setError((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      elevation={0}
      className={styles.registerformcontainer}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: { xs: 3, sm: 4 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div className={styles.formheader}>
          <img src="/assets/WI1_500px.png" alt="LogoBeeJop" className={styles.logo} />
          <h1>Create an account</h1>
        </div>

        {error && (
          <Typography
            color="error"
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: "rgba(211, 47, 47, 0.1)",
              borderRadius: 1,
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            {error}
          </Typography>
        )}

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field1}`}
          type="text"
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={handleFullNameChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2.5,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field2}`}
          type="text"
          label="First Last Name"
          variant="outlined"
          value={firstLastName}
          onChange={handleFirstLastNameChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2.5,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field3}`}
          type="text"
          label="Second Last Name"
          variant="outlined"
          value={secondLastName}
          onChange={handleSecondLastNameChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2.5,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <div className={styles.formdivider}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography variant="body2" className={styles.formdividertext}>
            Account Details
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field4}`}
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2.5,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field5}`}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2.5,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <TextField
          className={`${styles.formfield} ${styles.animatefield} ${styles.field6}`}
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#1B0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            "& .MuiInputLabel-root": { color: "#1B0096" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(27, 0, 150, 0.5)", borderRadius: "8px" },
              "&:hover fieldset": { borderColor: "#1B0096" },
              "&.Mui-focused fieldset": { borderColor: "#1B0096" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={styles.registerbutton}
          disabled={loading}
          sx={{ height: "48px" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register Now"}
        </Button>

        <Typography
          variant="body2"
          sx={{
            marginTop: 3,
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          Already have an account?{" "}
          <a href="/login" className={styles.loginlink}>
            Log in here
          </a>
        </Typography>
      </Box>
    </Paper>
  )
}

export default RegisterForm

