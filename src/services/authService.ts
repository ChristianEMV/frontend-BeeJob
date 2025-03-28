import axios from "axios"
import { jwtDecode } from "jwt-decode"

const API_URL_USER = "http://localhost:8080/api/beejob/users"
const API_URL_AUTH = "http://localhost:8080/api/auth"
const API_URL_ADMIN = "http://localhost:8080/api/beejob"

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

export const createVacant = async (vacantData: any) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_URL_ADMIN}/vacants/create`, vacantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error creating vacant")
    } else {
      throw new Error("Error creating vacant")
    }
  }
}

export const updateVacant = async (vacantData: any) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_URL_ADMIN}/vacants/update`, vacantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al actualizar la vacante:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta del backend:", error.response.data);
      throw new Error(error.response.data.message || "Error updating vacant");
    } else {
      throw new Error("Error updating vacant");
    }
  }
}

export const updateVacantStatus = async (vacantStatusData: any) => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.patch(`${API_URL_ADMIN}/vacants/update-status`, vacantStatusData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error updating vacant status")
    } else {
      throw new Error("Error updating vacant status")
    }
  }
}

export const getVacantById = async (id: number) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.post(
      `${API_URL_ADMIN}/vacants/get-all-all`,
      {
        page: 0,
        size: 1000, // Asegúrate de obtener suficientes vacantes
        search: "",
        sortBy: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (response.data && response.data.content) {
      const vacant = response.data.content.find((v: any) => v.id === id)
      if (vacant) {
        return vacant
      }
    }

    throw new Error("Vacant not found")
  } catch (error) {
    console.error("Error fetching vacant by ID:", error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error fetching vacant")
    } else {
      throw new Error("Error fetching vacant")
    }
  }
}

export const getAllVacants = async (filter: any) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    console.log("Sending request with params:", {
      page: filter.page,
      size: filter.size,
      search: filter.search || "",
      sortBy: filter.sortBy || "",
    })

    const response = await axios.post(
      `${API_URL_ADMIN}/vacants/get-all-all`,
      {
        page: filter.page,
        size: filter.size,
        search: filter.search || "",
        sortBy: filter.sortBy || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Response received:", response.data)
    return response.data
  } catch (error) {
    console.error("API Error:", error)
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Handle unauthorized error - could redirect to login
        console.error("Authentication error: Token may be invalid or expired")
        localStorage.removeItem("token") // Clear invalid token
      }
      throw new Error(error.response?.data?.message || "Error fetching vacants")
    } else {
      throw new Error("Error fetching vacants")
    }
  }
}

export const getAllVacantsUser = async (filter: any) => {
  try {
    const token = localStorage.getItem("token")
    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" }

    const response = await axios.post(
      `${API_URL_ADMIN}/vacants/get-all`,
      {
        page: filter.page,
        size: filter.size,
        search: filter.search || "",
        sortBy: filter.sortBy || "",
      },
      { headers },
    )

    console.log("Response received:", response.data)
    return response.data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}



