import React from "react";
import { TextField, Button, Box, Typography, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import "./Login.css";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
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
      <img src="/assets/WI1_500px.png" alt="LogoBeeJop" className="logo" />
      <h1>Welcome back!</h1>
      {error && <Typography color="error">{error}</Typography>}
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
          '& .MuiInputLabel-root': { color: '#1B0096' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1B0096' },
            '&:hover fieldset': { borderColor: '#1B0096' },
            '&.Mui-focused fieldset': { borderColor: '#1B0096' },
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
      <Button type="submit" variant="contained" fullWidth className="login-button">
        Log-in
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;