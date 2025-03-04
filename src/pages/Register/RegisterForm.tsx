import React, { useState } from "react";
import { TextField, Button, Box, Typography, InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Register.css";

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [firstLastName, setFirstLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value);
  const handleFirstLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstLastName(e.target.value);
  const handleSecondLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSecondLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(fullName, firstLastName, secondLastName, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      setError((error as any).message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        type="text"
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={handleFullNameChange}
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
        type="text"
        label="First Last Name"
        variant="outlined"
        value={firstLastName}
        onChange={handleFirstLastNameChange}
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
        type="text"
        label="Second Last Name"
        variant="outlined"
        value={secondLastName}
        onChange={handleSecondLastNameChange}
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
        onChange={handleEmailChange}
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
        onChange={handlePasswordChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: '#1B0096' }} />
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
        label="Confirm Password"
        variant="outlined"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
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