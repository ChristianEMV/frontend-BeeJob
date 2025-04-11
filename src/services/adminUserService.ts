import axios from "axios";

const API_URL_USER = "http://localhost:8080/api/beejob/users";
import {
  RequestBaseForDeleteAndGetOneDTO,
  PaginationRequestDTO,
  UpdateUserStatusDTO,
  ResponseGetPostulantsDTO,
  PageResponse,
  RequestGetPostulantDTO
} from "../types/userTypes"; 

// Servicio para obtener todos los postulantes con paginación y filtros
export const getAllPostulants = async (
  filter: PaginationRequestDTO
): Promise<PageResponse<ResponseGetPostulantsDTO>> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.post<PageResponse<ResponseGetPostulantsDTO>>(
      `${API_URL_USER}/get-all-postulants`,
      filter,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Postulantes obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching postulants:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error fetching postulants"
      );
    } else {
      throw new Error("Error fetching postulants");
    }
  }
};

// Servicio para actualizar el estado de un postulante
export const updatePostulantStatus = async (
  request: UpdateUserStatusDTO
): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.put<string>(
      `${API_URL_USER}/update-postulant-status`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Estado del postulante actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating postulant status:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error updating postulant status"
      );
    } else {
      throw new Error("Error updating postulant status");
    }
  }
};

// Servicio para obtener un postulante específico por ID
export const getPostulantById = async (
  request: RequestGetPostulantDTO
): Promise<ResponseGetPostulantsDTO> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.post<ResponseGetPostulantsDTO>(
      `${API_URL_USER}/get-one-postulant`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Postulante obtenido:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching postulant by ID:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error fetching postulant by ID"
      );
    } else {
      throw new Error("Error fetching postulant by ID");
    }
  }
};
