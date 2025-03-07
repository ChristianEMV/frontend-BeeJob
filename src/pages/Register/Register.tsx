import type React from "react"
import RegisterForm from "./RegisterForm"
import styles from "./styles.module.css"

const Register: React.FC = () => {
  return (
    <div className={styles.registerbackground}>
      <div className={styles.registercontainer}>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register

