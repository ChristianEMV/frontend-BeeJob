import axios from "axios"
import { jwtDecode } from "jwt-decode"

const API_URL_USER = "http://localhost:8080/api/beejob/users"
const API_URL_AUTH = "http://localhost:8080/api/auth"

export const register = async (
  name: string,
  firstLastName: string,
  secondLastName: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${API_URL_USER}/register-user`, {
      name,
      firstLastName,
      secondLastName,
      email,
      password,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error registering user")
    } else {
      throw new Error("Error registering user")
    }
  }
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/login`, {
      email,
      password,
    })
    const { token } = response.data
    localStorage.setItem("token", token)
    const decodedToken: any = jwtDecode(token)
    localStorage.setItem("role", decodedToken.role)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error logging in")
    } else {
      throw new Error("Error logging in")
    }
  }
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
}

