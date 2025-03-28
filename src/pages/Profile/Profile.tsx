"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Swal from "sweetalert2"
import styles from "./styles.module.css"
import { Icon } from "@iconify/react"
import { CircularProgress } from "@mui/material"
import Modal from "../Modal/Modal"
import {
  getUserInSession,
  updateUserPersonalInfo,
  updateUserImage,
  type UserInSession,
} from "../../services/authService"

const Profile: React.FC = () => {
  // Referencia para el input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resumeInputRef = useRef<HTMLInputElement>(null)

  

  // Section and editing states
  const [selectedSection, setSelectedSection] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)



  // User data states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserInSession | null>(null)

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    addressState: "",
    addressCountry: "",
    profilePicture: "/placeholder.svg?height=100&width=100",
    password: "", // Añadir este campo
  })

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const data = await getUserInSession()
        console.log("Datos del usuario recibidos:", data)
        setUserData(data)

        // Update personal info state with fetched data
        if (data) {
          // Los datos están en el nivel raíz, no dentro de personalInformation
          const firstLastName = data.firstLastName || ""
          const secondLastName = data.secondLastName || ""
          const fullSurname = [firstLastName, secondLastName].filter(Boolean).join(" ")

          setPersonalInfo({
            name: data.name || "",
            surname: fullSurname,
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            addressState: data.adressState || "",
            addressCountry: data.adressCountry || "",
            profilePicture: data.image
              ? `data:image/jpeg;base64,${data.image}`
              : "/placeholder.svg?height=100&width=100",
            password: "", // Initialize password
          })
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Could not load user information. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])


  const handleEdit = (section: string) => {
    setIsEditing(!isEditing)
    if (isEditing) {
      if (section === "personal") {
        if (!personalInfo.name || !personalInfo.email) {
          Swal.fire("Error", "Los campos nombre y email son obligatorios", "error")
          return
        }
      } else if (section === "professional") {
        // Validation for professional info if needed
      }
      Swal.fire("Success", "Information updated successfully", "success")
    }
  }

  // Función para manejar la selección de imagen
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      Swal.fire("Error", "Please select a valid image file", "error")
      return
    }

    try {
      setIsUploadingImage(true)

      // Llamar al servicio para actualizar la imagen
      const updatedUser = await updateUserImage(file)

      // Actualizar la imagen en el estado
      if (updatedUser && updatedUser.image) {
        setPersonalInfo({
          ...personalInfo,
          profilePicture: `data:image/jpeg;base64,${updatedUser.image}`,
        })

        Swal.fire("Success", "Profile image updated successfully", "success")
      }
    } catch (error) {
      console.error("Error al actualizar la imagen:", error)
      Swal.fire("Error", "Could not update profile image", "error")
    } finally {
      setIsUploadingImage(false)
    }
  }

  // Función para abrir el selector de archivos
  const handleImageClick = () => {
    if (!isUploadingImage) {
      fileInputRef.current?.click()
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }


  return (
    <div className={styles.dashboardcontainer}>
      <aside className={styles.sidebar}>
        <h2>Profile 👨🏽‍💻</h2>
        <ul>
          <li
            className={selectedSection === "personal" ? "active" : ""}
            onClick={() => {
              // Save current section data before changing
              if (selectedSection === "professional" && resumeData) {
                // Ensure resume data is saved before leaving the professional section
                const saveResumeData = async () => {
                  try {
                    // If needed, you could add an additional API call here to ensure data is saved
                    // For now, just refresh the user data
                    await getUserInSession()
                  } catch (error) {
                    console.error("Error saving resume data:", error)
                  }
                }
                saveResumeData()
              }
              setSelectedSection("personal")
            }}
          >
            Personal Information
          </li>
          <li
            className={selectedSection === "professional" ? "active" : ""}
            onClick={() => {
              setSelectedSection("professional")
              // When entering professional section, refresh data to ensure we have the latest
              if (selectedSection !== "professional") {
                const refreshUserData = async () => {
                  try {
                    const updatedData = await getUserInSession()
                    if (
                      updatedData &&
                      updatedData.professionalInformation &&
                      updatedData.professionalInformation.resume
                    ) {
                      setResumeData(updatedData.professionalInformation.resume)
                    }
                  } catch (error) {
                    console.error("Error refreshing user data:", error)
                  }
                }
                refreshUserData()
              }
            }}
          >
            Professional Information
          </li>
          <li
            className={selectedSection === "academy" ? "active" : ""}
            onClick={() => {
              // Save current section data before changing
              if (selectedSection === "professional" && resumeData) {
                // Ensure resume data is saved before leaving the professional section
                const saveResumeData = async () => {
                  try {
                    // If needed, you could add an additional API call here to ensure data is saved
                    // For now, just refresh the user data
                    await getUserInSession()
                  } catch (error) {
                    console.error("Error saving resume data:", error)
                  }
                }
                saveResumeData()
              }
              setSelectedSection("academy")
            }}
          >
            Academy and Work
          </li>
        </ul>
      </aside>

      <div className={styles.contentcontainer}>
        {selectedSection === "personal" && (
          <div>
            <h1 className={styles.profiletitle}>Personal Information</h1>
            <div className={styles.profileinfo}>
              <div className={`${styles.profilefield} ${styles.profilepicture}`}>
                {/* Input oculto para seleccionar archivos */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Imagen de perfil con indicador de carga */}
                <div className={styles.profileImageContainer} onClick={handleImageClick}>
                  {isUploadingImage ? (
                    <div className={styles.imageLoading}>
                      <CircularProgress size={40} style={{ color: "#1b0096" }} thickness={4} />
                    </div>
                  ) : (
                    <>
                      <img
                        src={personalInfo.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className={styles.profileicon}
                      />
                      <div className={styles.imageOverlay}>
                        <Icon icon="mdi:camera" className={styles.cameraIcon} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.profilefield}>
                <label>Full Name:</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  />
                ) : (
                  <span>{personalInfo.name}</span>
                )}
              </div>
              <div className={styles.profilefield}>
                <label>Surname:</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={personalInfo.surname}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, surname: e.target.value })}
                  />
                ) : (
                  <span>{personalInfo.surname}</span>
                )}
              </div>
              <div className={styles.profilefield}>
                <label>Email:</label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    readOnly
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
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
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
                    onChange={(e) => setPersonalInfo({ ...personalInfo, addressState: e.target.value })}
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
                    onChange={(e) => setPersonalInfo({ ...personalInfo, addressCountry: e.target.value })}
                  />
                ) : (
                  <span>{personalInfo.addressCountry || "Not specified"}</span>
                )}
              </div>
              <div className={styles.profilefield}>
                <label>Current Password (required to save):</label>
                {isEditingProfile && (
                  <input
                    type="password"
                    placeholder="Enter your password to confirm changes"
                    onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                  />
                )}
              </div>
              <section>
                {isSavingProfile ? (
                  <button
                    title="Save"
                    // Add phone number validation in the personal info update
                    // Modify the updateUserPersonalInfo call in the button onClick handler
                    onClick={async () => {
                      try {
                        // Validate password is provided
                        if (!personalInfo.password) {
                          Swal.fire("Error", "You must enter your password to save changes", "error")
                          return
                        }

                        // Validate name and email
                        if (!personalInfo.name || !personalInfo.email) {
                          Swal.fire("Error", "Name and email fields are required", "error")
                          return
                        }

                        // Validate email format
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (!emailRegex.test(personalInfo.email)) {
                          Swal.fire("Error", "Invalid email format", "error")
                          return
                        }

                        // Validate phone number (if provided)
                        if (personalInfo.phoneNumber) {
                          const phoneRegex = /^[0-9]{10}$/
                          if (!phoneRegex.test(personalInfo.phoneNumber)) {
                            Swal.fire("Error", "Phone number must contain exactly 10 digits", "error")
                            return
                          }
                        }

                        // Validate name length
                        if (personalInfo.name.length > 30) {
                          Swal.fire("Error", "Name must not exceed 30 characters", "error")
                          return
                        }

                        // Validate address fields length
                        if (personalInfo.addressState && personalInfo.addressState.length > 30) {
                          Swal.fire("Error", "Address state must not exceed 30 characters", "error")
                          return
                        }

                        if (personalInfo.addressCountry && personalInfo.addressCountry.length > 30) {
                          Swal.fire("Error", "Address country must not exceed 30 characters", "error")
                          return
                        }

                        setIsSavingProfile(true)

                        // Prepare data for update
                        const updateData = {
                          email: personalInfo.email,
                          password: personalInfo.password,
                          name: personalInfo.name,
                          firstLastName: personalInfo.surname.split(" ")[0] || "",
                          secondLastName: personalInfo.surname.split(" ").slice(1).join(" ") || "",
                          phoneNumber: personalInfo.phoneNumber || "",
                          adressState: personalInfo.addressState || "",
                          adressCountry: personalInfo.addressCountry || "",
                        }

                        // Call update service
                        await updateUserPersonalInfo(updateData)

                        Swal.fire("Success", "Personal information updated successfully", "success")
                        setIsEditingProfile(false)
                      } catch (error) {
                        console.error("Error updating information:", error)
                        Swal.fire("Error", "Could not update personal information", "error")
                      } finally {
                        setIsSavingProfile(false)
                      }
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    title="Edit"
                    onClick={() => {
                      setIsEditingProfile(true)
                      setIsSavingProfile(true)
                    }}
                  >
                    <Icon icon="cil:pencil" /> Edit
                  </button>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

