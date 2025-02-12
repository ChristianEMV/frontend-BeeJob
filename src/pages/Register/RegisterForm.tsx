import React from "react";
import { TextField, Button, Box, Typography, InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import "./Register.css";

type RegisterFormProps = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  fullName,
  email,
  password,
  confirmPassword,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <img src="/path/to/logo.png" alt="LogoBeeJop" className="logo" />
      <h1>Create an account</h1>
      <TextField
        type="text"
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={onFullNameChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: '#1B0096' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-root': { color: '#1B0096' }, // color del label
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1B0096' }, // color del borde
            '&:hover fieldset': { borderColor: '#1B0096' }, // color del borde al hacer hover
            '&.Mui-focused fieldset': { borderColor: '#1B0096' }, // color del borde al estar enfocado
          },
        }}
      />
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={onEmailChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: '#1B0096' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-root': { color: '#1B0096' }, // color del label
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1B0096' }, // color del borde
            '&:hover fieldset': { borderColor: '#1B0096' }, // color del borde al hacer hover
            '&.Mui-focused fieldset': { borderColor: '#1B0096' }, // color del borde al estar enfocado
          },
        }}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={onPasswordChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: '#1B0096' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-root': { color: '#1B0096' }, // color del label
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1B0096' }, // color del borde
            '&:hover fieldset': { borderColor: '#1B0096' }, // color del borde al hacer hover
            '&.Mui-focused fieldset': { borderColor: '#1B0096' }, // color del borde al estar enfocado
          },
        }}
      />
      <TextField
        type="password"
        label="Confirm Password"
        variant="outlined"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: '#1B0096' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-root': { color: '#1B0096' }, // color del label
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1B0096' }, // color del borde
            '&:hover fieldset': { borderColor: '#1B0096' }, // color del borde al hacer hover
            '&.Mui-focused fieldset': { borderColor: '#1B0096' }, // color del borde al estar enfocado
          },
        }}
      />
      <Button type="submit" variant="contained" fullWidth className="register-button">
        Register Now
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account? <a href="/login">Log in here</a>
      </Typography>
    </Box>
  );
};

export default RegisterForm;