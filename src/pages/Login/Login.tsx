import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { login } from '../../services/authService';
import Swal from 'sweetalert2';
import "./Login.css";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const role = localStorage.getItem('role');
      setIsAuthenticated(true);
      setIsAdmin(role === 'ADMIN');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
      }).then(() => {
        navigate(role === 'ADMIN' ? '/adminHome' : '/home');
      });
    } catch (error) {
      setError((error as any).message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: (error as any).message,
      });
    }
  };

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
        />
      </div>
    </div>
  );
};

export default Login;