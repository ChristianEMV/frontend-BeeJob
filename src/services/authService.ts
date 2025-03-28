import axios from "axios"
import { jwtDecode } from "jwt-decode"

const API_URL_USER = "http://localhost:8080/api/beejob/users"
const API_URL_AUTH = "http://localhost:8080/api/auth"
const API_URL_ADMIN = "http://localhost:8080/api/beejob"

// Postulaciones
const API_URL_POSTULATIONS = "http://localhost:8080/api/beejob/postulations"
const API_URL_POSTULATION = "http://localhost:8080/api/beejob/postulations"


// User types - Actualizada para reflejar la estructura real de la API
export interface UserInSession {
  userId: number
  email: string
  role?: string
  status?: boolean
  name?: string
  firstLastName?: string
  secondLastName?: string | null
  phoneNumber?: string | null
  adressState?: string | null
  adressCountry?: string | null
  image?: string | null
  personalInformation?: any // Parece ser un objeto vacío en la respuesta
  professionalInformation?: {
    cvLink?: string | null
    hardSkills?: string | null
    softSkills?: string | null
    languages?: string | null
    socialMedia?: string | null
    resume?: {
      id: number
      pdf: string // Base64 encoded PDF
    } | null
  }
}


// Añadir esta nueva interfaz después de getUserInSession
export interface UpdateUserPersonalInfoRequest {
  email: string
  password?: string
  name: string
  firstLastName: string
  secondLastName: string
  phoneNumber: string
  adressState: string
  adressCountry: string
}

// Interfaz para la solicitud de paginación y filtros
export interface PaginationRequestDTO {
  page: number
  size: number
  status?: boolean | null
  search?: string | null
  sortBy?: string // "ASC" o "DESC"
}


// Interfaz para actualizar el estado de un postulante
export interface UpdateUserStatusDTO {
  userId: number
  status: boolean
}
// Interfaz para la respuesta de un postulante
export interface ResponseGetPostulantsDTO {
  userId: number
  email: string
  name: string
  firstLastName: string
  secondLastName: string
  phoneNumber: string
  adressState: string
  adressCountry: string
  status: boolean
}

// Add this enum for postulation status
export enum EPostulationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface RequestPostulationDTO {
  id: number // ID de la vacante
}

export interface ResponsePostulationDTO {
  id: number
  applicationDate: string
  status: EPostulationStatus
  userId: number
  vacantId: number
  professionalInformationId: number
  vacantName: string
  companyName: string
}

// Interfaz para la solicitud de paginación y filtros
export interface PaginationRequestDTO {
  page: number
  size: number
  status?: boolean | null
  search?: string | null
  sortBy?: string // "ASC" o "DESC"
}

// Interfaz para actualizar el estado de un postulante
export interface UpdateUserStatusDTO {
  userId: number
  status: boolean
}

// Interfaz para la respuesta de un postulante
export interface ResponseGetPostulantsDTO {
  userId: number
  email: string
  name: string
  firstLastName: string
  secondLastName: string
  phoneNumber: string
  adressState: string
  adressCountry: string
  status: boolean
}

export interface RequestPaginationPostulationDTO {
  page: number
  size: number
  sortDirection: "ASC" | "DESC"
  status: EPostulationStatus | null
}

export interface RequestGetPostulationDTO {
  id: number // ID de la postulación
}

export interface RequestUpdatePostulationStatusDTO {
  postulationId: number
  status: EPostulationStatus
}


export interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}


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


// Actualiza la función getUserInSession para manejar la estructura real de la API
export const getUserInSession = async (): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.get(`${API_URL_USER}/get-user-in-session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Log completo de la respuesta para depuración
    console.log("Respuesta completa de la API:", response)
    console.log("Datos del usuario:", response.data)

    // Devuelve directamente los datos de la respuesta
    return response.data
  } catch (error) {
    console.error("Error fetching user in session:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      if (error.response.status === 401) {
        // Handle unauthorized error - could redirect to login
        console.error("Authentication error: Token may be invalid or expired")
        localStorage.removeItem("token") // Clear invalid token
      }
      throw new Error(error.response.data?.message || "Error fetching user information")
    } else {
      throw new Error("Error fetching user information")
    }
  }
}

// Añadir esta nueva función después de getUserInSession
export const updateUserPersonalInfo = async (userData: UpdateUserPersonalInfoRequest): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.put(`${API_URL_USER}/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Usuario actualizado:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating user information:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error updating user information")
    } else {
      throw new Error("Error updating user information")
    }
  }
}

// Añadir el servicio para actualizar la imagen de perfil
export const updateUserImage = async (imageFile: File): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData()
    formData.append("image", imageFile)

    const response = await axios.put(`${API_URL_USER}/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("Imagen de perfil actualizada:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating profile image:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error updating profile image")
    } else {
      throw new Error("Error updating profile image")
    }
  }
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

// Add this function after the getAllVacantsUser function
export const getUserPostulations = async (filter: RequestPaginationPostulationDTO) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    console.log("Sending postulations request with body:", filter)

    // Use axios to make a POST request with a JSON body
    const response = await axios.post(`${API_URL_POSTULATIONS}/my-postulations`, filter, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Postulations response received:", response.data)
    console.log("Total postulations:", response.data.totalElements)
    console.log("Total pages:", response.data.totalPages)
    console.log("Current page content:", response.data.content)

    return response.data
  } catch (error) {
    console.error("Error fetching postulations:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Postulations API error response:", error.response)
      console.error("Postulations error status:", error.response.status)
      console.error("Postulations error data:", error.response.data)
      throw new Error(error.response.data?.message || "Error fetching postulations")
    } else {
      throw new Error("Error fetching postulations")
    }
  }
}

// Servicio para obtener una postulación específica del usuario por ID
export const getUserPostulationById = async (request: RequestGetPostulationDTO): Promise<ResponsePostulationDTO> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.get(`${API_URL_POSTULATION}/my-postulation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: request,
    })

    console.log("Postulación del usuario obtenida:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching user postulation:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error fetching user postulation")
    } else {
      throw new Error("Error fetching user postulation")
    }
  }
}

// Servicio para obtener todas las postulaciones (solo admin)
export const getAllPostulations = async (
  filter: RequestPaginationPostulationDTO,
): Promise<PageResponse<ResponsePostulationDTO>> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    // Cambiar a POST para enviar el filtro en el cuerpo de la solicitud
    const response = await axios.post(`${API_URL_POSTULATION}/get-postulations`, filter, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Todas las postulaciones obtenidas:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching all postulations:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error fetching all postulations")
    } else {
      throw new Error("Error fetching all postulations")
    }
  }
}

// Servicio para obtener una postulación específica (solo admin)
export const getPostulation = async (requestDTO: RequestGetPostulationDTO): Promise<ResponsePostulationDTO> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.get(`${API_URL_POSTULATION}/get-postulation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: requestDTO,
    })

    console.log("Postulación obtenida:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching postulation:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error fetching postulation")
    } else {
      throw new Error("Error fetching postulation")
    }
  }
}

// Servicio para actualizar el estado de una postulación (solo admin)
export const updatePostulationStatus = async (
  requestDTO: RequestUpdatePostulationStatusDTO,
): Promise<ResponsePostulationDTO> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.patch(`${API_URL_POSTULATION}/update-postulation-status`, requestDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Estado de postulación actualizado:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating postulation status:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error updating postulation status")
    } else {
      throw new Error("Error updating postulation status")
    }
  }
}


// Servicio getAllPostulantspara obtener todos los postulantes con paginación y filtros
export const getAllPostulants = async (
  filter: PaginationRequestDTO,
): Promise<PageResponse<ResponseGetPostulantsDTO>> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.post<PageResponse<ResponseGetPostulantsDTO>>(
      `${API_URL_USER}/get-all-postulants`,
      filter,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Postulantes obtenidos:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching postulants:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error fetching postulants")
    } else {
      throw new Error("Error fetching postulants")
    }
  }
}

// Servicio para actualizar el estado de un postulante
export const updatePostulantStatus = async (
  request: UpdateUserStatusDTO,
): Promise<string> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.put<string>(
      `${API_URL_USER}/update-postulant-status`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Estado del postulante actualizado:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating postulant status:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error updating postulant status")
    } else {
      throw new Error("Error updating postulant status")
    }
  }
}

// Servicio para obtener un postulante específico por ID
export const getPostulantById = async (
  request: RequestGetPostulationDTO,
): Promise<ResponseGetPostulantsDTO> => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await axios.post<ResponseGetPostulantsDTO>(
      `${API_URL_USER}/get-one-postulant`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Postulante obtenido:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching postulant by ID:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response)
      throw new Error(error.response.data?.message || "Error fetching postulant by ID")
    } else {
      throw new Error("Error fetching postulant by ID")
    }
  }
}

