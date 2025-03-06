import type React from "react"
import RegisterForm from "./RegisterForm"
import "./Register.css"

const Register: React.FC = () => {
  return (
    <div className="register-background">
      <div className="register-container">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register

