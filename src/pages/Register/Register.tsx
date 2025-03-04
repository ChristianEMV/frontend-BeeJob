import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import "./Register.css";

const Register: React.FC = () => {

  return (
    <div className="register-background">
      <div>
        <RegisterForm
        />
      </div>
    </div>
  );
};

export default Register;