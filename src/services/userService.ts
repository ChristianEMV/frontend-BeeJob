import axios from "axios";

const API_URL_USER = "http://localhost:8080/api/beejob/users";
import {
  UserInSession,
  UpdateUserPersonalInfoRequest
} from "../types/userTypes"; 


export const disableUserAccount = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    await axios.put(
      `${API_URL_USER}/disable-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Error disabling account"
      );
    }
    throw new Error("Error disabling account");
  }
};

// Actualiza la función getUserInSession para manejar la estructura real de la API
export const getUserInSession = async (): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_URL_USER}/get-user-in-session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Log completo de la respuesta para depuración
    console.log("Respuesta completa de la API:", response);
    console.log("Datos del usuario:", response.data);

    // Devuelve directamente los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error("Error fetching user in session:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      if (error.response.status === 401) {
        // Handle unauthorized error - could redirect to login
        console.error("Authentication error: Token may be invalid or expired");
        localStorage.removeItem("token"); // Clear invalid token
      }
      throw new Error(
        error.response.data?.message || "Error fetching user information"
      );
    } else {
      throw new Error("Error fetching user information");
    }
  }
};

// Añadir esta nueva función después de getUserInSession
export const updateUserPersonalInfo = async (
  userData: UpdateUserPersonalInfoRequest
): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.put(`${API_URL_USER}/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Usuario actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user information:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error updating user information"
      );
    } else {
      throw new Error("Error updating user information");
    }
  }
};

// Añadir el servicio para actualizar la imagen de perfil
export const updateUserImage = async (
  imageFile: File
): Promise<UserInSession> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.put(`${API_URL_USER}/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Imagen de perfil actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile image:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error updating profile image"
      );
    } else {
      throw new Error("Error updating profile image");
    }
  }
};

// Añadir el servicio para eliminar la imagen de perfil
export const deleteUserImage = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(
      `${API_URL_USER}/delete-profile-image`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
        },
      }
    );

    console.log("Profile image removed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting profile image:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta de error de la API:", error.response);
      throw new Error(
        error.response.data?.message || "Error deleting profile image"
      );
    } else {
      throw new Error("Error deleting profile image");
    }
  }
};