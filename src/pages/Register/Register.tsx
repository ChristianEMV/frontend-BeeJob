import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import "./Register.css";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Full Name:", fullName, "Email:", email, "Password:", password, "Confirm Password:", confirmPassword);
    navigate("/home");
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <RegisterForm
          fullName={fullName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onFullNameChange={(e) => setFullName(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;