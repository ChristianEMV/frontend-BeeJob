"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import { Icon } from "@iconify/react";
import { CircularProgress } from "@mui/material";

import {
  getUserInSession,
  updateUserPersonalInfo,
  updateUserImage,
  deleteUserImage,
  disableUserAccount,
  type UserInSession,
} from "../../services/userService";

const Profile: React.FC = () => {
  // Referencia para el input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Section and editing states
  const [selectedSection, setSelectedSection] = useState("personal");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [resumeData, setResumeData] = useState<{
    id: number;
    pdf: string;
  } | null>(null);

  // User data states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserInSession | null>(null);

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    firstLastName: "",
    secondLastName: "",
    email: "",
    phoneNumber: "",
    addressState: "",
    addressCountry: "",
    profilePicture: "/placeholder.svg?height=100&width=100",
    password: "",
  });

  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleDeleteImage = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b0096",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: styles.swalPopup,
        confirmButton: styles.swalConfirmButton,
        cancelButton: styles.swalCancelButton,
      },
    });

    if (result.isConfirmed) {
      try {
        setIsDeletingImage(true);
        await deleteUserImage();

        setPersonalInfo({
          ...personalInfo,
          profilePicture: "/placeholder.svg?height=100&width=100",
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your profile image has been deleted.",
          icon: "success",
          confirmButtonColor: "#1b0096",
        });
      } catch (error) {
        console.error("Error deleting image:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not delete profile image",
          icon: "error",
          confirmButtonColor: "#1b0096",
        });
      } finally {
        setIsDeletingImage(false);
      }
    }
  };

  const [originalPersonalInfo, setOriginalPersonalInfo] = useState(personalInfo);

  const handleCancel = () => {
    setIsEditingProfile(false);
    setPersonalInfo(originalPersonalInfo); // Restaurar valores originales
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await getUserInSession();
        console.log("Datos del usuario recibidos:", data);
        setUserData(data);

        // Update personal info state with fetched data
        if (data) {
          setPersonalInfo({
            name: data.name || "",
            firstLastName: data.firstLastName || "",
            secondLastName: data.secondLastName || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            addressState: data.adressState || "",
            addressCountry: data.adressCountry || "",
            profilePicture: data.image
              ? `data:image/jpeg;base64,${data.image}`
              : "/placeholder.svg?height=100&width=100",
            password: "", // Initialize password
          });
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Could not load user information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDisableAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<div style="color: #ff4444; font-size: 14px; margin-top: 10px;">
              This action will permanently disable your account and you won't be able to log in again.
            </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Disable Account",
      cancelButtonText: "Cancel",
      customClass: {
        popup: styles.swalPopup,
        confirmButton: styles.swalConfirmButton,
        cancelButton: styles.swalCancelButton,
      },
    });

    if (result.isConfirmed) {
      try {
        await disableUserAccount();

        // Limpiar datos de sesión
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirigir al login

        Swal.fire({
          title: "Account Disabled",
          text: "Your account has been successfully disabled",
          icon: "success",
          confirmButtonColor: "#1b0096",
        });
      } catch (error) {
        console.error("Error disabling account:", error);
        Swal.fire({
          title: "Error!",
          text:
            error instanceof Error
              ? error.message
              : "Could not disable account",
          icon: "error",
          confirmButtonColor: "#1b0096",
        });
      }
    }
  };

  // Función para manejar la selección de imagen
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      Swal.fire("Error", "Please select a valid image file", "error");
      return;
    }

    try {
      setIsUploadingImage(true);

      // Llamar al servicio para actualizar la imagen
      const updatedUser = await updateUserImage(file);

      // Actualizar la imagen en el estado
      if (updatedUser && updatedUser.image) {
        setPersonalInfo({
          ...personalInfo,
          profilePicture: `data:image/jpeg;base64,${updatedUser.image}`,
        });

        Swal.fire("Success", "Profile image updated successfully", "success");
      }
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
      Swal.fire("Error", "Could not update profile image", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Función para abrir el selector de archivos
  const handleImageClick = () => {
    if (!isUploadingImage) {
      fileInputRef.current?.click();
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress
          size={60}
          style={{ color: "#1b0096" }}
          thickness={4}
        />
        <p>Loading user information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return (
    <div className={styles.dashboardcontainer}>
      <aside className={styles.sidebar}>
        <h2>Profile 👨🏽‍💻</h2>
        <ul>
          <li
            className={`w-full text-center ${
              selectedSection === "personal" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedSection("personal");
            }}
          >
            Personal Information
          </li>

          <li
            className={selectedSection === "professional" ? "active" : ""}
            onClick={() => {
              setSelectedSection("professional");
            }}
          >
            Professional Information
          </li>
          <li
            className={selectedSection === "academy" ? "active" : ""}
            onClick={() => {
              setSelectedSection("academy");
            }}
          >
            Academy and Work
          </li>
        </ul>
      </aside>

      <div className={styles.contentcontainer}>
        {selectedSection === "personal" && (
          <div>
            { <h1 className={styles.profiletitle}>Personal Information</h1> }
            <div className={styles.profileinfo}>
              {/* Sección de imagen de perfil */}
              <div
                className={`${styles.profilefield} ${styles.profilepicture}`}
              >
                <div className={styles.imageUploadContainer}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div
                    className={styles.profileImageContainer}
                    onClick={handleImageClick}
                  >
                    {isUploadingImage ? (
                      <div className={styles.imageLoading}>
                        <CircularProgress
                          size={40}
                          style={{ color: "#1b0096" }}
                          thickness={4}
                        />
                      </div>
                    ) : (
                      <>
                        <img
                          src={
                            personalInfo.profilePicture || "/placeholder.svg"
                          }
                          alt=""
                          className={styles.profileicon}
                        />
                        <div className={styles.imageOverlay}>
                          <Icon
                            icon="mdi:camera"
                            className={styles.cameraIcon}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {personalInfo.profilePicture !== "/placeholder.svg" && (
                    <button
                      className={styles.deleteImageButton}
                      onClick={handleDeleteImage}
                      disabled={isUploadingImage}
                    >
                      <Icon icon="mdi:trash-can" />
                      {isDeletingImage ? "Deleting..." : "Delete Image"}
                    </button>
                  )}
                </div>
              </div>

              {/* Campos del formulario en grid */}
              <div className={styles.gridContainer}>
                <div className={styles.profilefield}>
                  <label>Name:</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{personalInfo.name}</span>
                  )}
                </div>

                {/* Primer Apellido */}
                <div className={styles.profilefield}>
                  <label>First Last Name:</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={personalInfo.firstLastName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          firstLastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{personalInfo.firstLastName || "Not specified"}</span>
                  )}
                </div>

                {/* Segundo Apellido */}
                <div className={styles.profilefield}>
                  <label>Second Last Name (Optional):</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={personalInfo.secondLastName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          secondLastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>
                      {personalInfo.secondLastName || "Not specified"}
                    </span>
                  )}
                </div>

                <div className={styles.profilefield}>
                  <label>Email:</label>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                </div>

                <div className={styles.profilefield}>
                  <label>Phone Number (10 digits):</label>
                  {isEditingProfile ? (
                    <input
                      type="tel"
                      value={personalInfo.phoneNumber}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                      pattern="[0-9]{10}"
                    />
                  ) : (
                    <span>{personalInfo.phoneNumber || "Not specified"}</span>
                  )}
                </div>

                <div className={styles.profilefield}>
                  <label>State/Province:</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={personalInfo.addressState}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          addressState: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{personalInfo.addressState || "Not specified"}</span>
                  )}
                </div>

                <div className={styles.profilefield}>
                  <label>Country:</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={personalInfo.addressCountry}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          addressCountry: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>
                      {personalInfo.addressCountry || "Not specified"}
                    </span>
                  )}
                </div>

                <div className={`${styles.profilefield} ${styles.fullWidth}`}>
                  <label>Current Password (required to save):</label>
                  {isEditingProfile ? (
                    <input
                      type="password"
                      placeholder="Enter your password to confirm changes"
                      value={personalInfo.password}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          password: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>••••••••</span>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className={styles.actionButtons}>
                {isEditingProfile ? (
                  <>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                    disabled={isSavingProfile}
                  >
                   <Icon icon="cil:x" />
                   Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        if (!personalInfo.password) {
                          Swal.fire(
                            "Error",
                            "You must enter your password to save changes",
                            "error"
                          );
                          return;
                        }

                        if (
                          !personalInfo.name ||
                          !personalInfo.firstLastName ||
                          !personalInfo.email ||
                          !personalInfo.phoneNumber ||
                          !personalInfo.addressState ||
                          !personalInfo.addressCountry
                        ) {
                          Swal.fire(
                            "Error",
                            "All the Fields are required, except the second last name",
                            "error"
                          );
                          return;
                        }

                        if (personalInfo.email) {
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (!emailRegex.test(personalInfo.email)) {
                            Swal.fire("Error", "Invalid email format", "error");
                            return;
                          }
                        }

                        if (personalInfo.phoneNumber) {
                          const phoneRegex = /^[0-9]{10}$/;
                          if (!phoneRegex.test(personalInfo.phoneNumber)) {
                            Swal.fire(
                              "Error",
                              "Phone number must contain exactly 10 digits",
                              "error"
                            );
                            return;
                          }
                        }

                        if (personalInfo.name.length > 30) {
                          Swal.fire(
                            "Error",
                            "Name must not exceed 30 characters",
                            "error"
                          );
                          return;
                        }

                        if (
                          personalInfo.addressState &&
                          personalInfo.addressState.length > 30
                        ) {
                          Swal.fire(
                            "Error",
                            "Address state must not exceed 30 characters",
                            "error"
                          );
                          return;
                        }

                        if (
                          personalInfo.addressCountry &&
                          personalInfo.addressCountry.length > 30
                        ) {
                          Swal.fire(
                            "Error",
                            "Address country must not exceed 30 characters",
                            "error"
                          );
                          return;
                        }

                        setIsSavingProfile(true);
                        const updateData = {
                          email: personalInfo.email,
                          password: personalInfo.password,
                          name: personalInfo.name,
                          firstLastName: personalInfo.firstLastName,
                          secondLastName: personalInfo.secondLastName,
                          phoneNumber: personalInfo.phoneNumber || "",
                          adressState: personalInfo.addressState || "",
                          adressCountry: personalInfo.addressCountry || "",
                        };

                        await updateUserPersonalInfo(updateData);
                        Swal.fire(
                          "Success",
                          "Personal information updated successfully",
                          "success"
                        );
                        setIsEditingProfile(false);
                      } catch (error) {
                        console.error("Error updating information:", error);
                        Swal.fire(
                          "Error",
                          "Could not update personal information",
                          "error"
                        );
                      } finally {
                        setIsSavingProfile(false);
                      }
                      // Limpiar contraseña después de guardar
                      setPersonalInfo((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }}
                    className={styles.saveButton}
                    disabled={isSavingProfile}
                  >
                    <Icon icon="cil:save" />
                    {isSavingProfile ? "Saving..." : "Save Changes"}
                  </button>
                  </>
                ) : (
                  <button
                  onClick={() => {
                    setIsEditingProfile(true);
                    setOriginalPersonalInfo(personalInfo); // Guardar estado original
                  }}
                    className={styles.editButton}
                  >
                    <Icon icon="cil:pencil" /> Edit Profile
                  </button>
                )}
                <button
                  onClick={handleDisableAccount}
                  className={styles.disableAccountButton}
                >
                  <Icon icon="mdi:account-cancel" /> Disable Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
