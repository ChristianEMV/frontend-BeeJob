import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "./Login.css";

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
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
      <h1>Welcome back!</h1>
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={onEmailChange}
        fullWidth
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={onPasswordChange}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth className="login-button">
        Log-in
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Don't have an account? <a href="/register">Sign up here</a>
      </Typography>
    </Box>
  );
};

export default LoginForm;