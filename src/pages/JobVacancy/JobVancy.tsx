"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CircularProgress, Pagination, PaginationItem, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Icon } from "@iconify/react"
import Swal from "sweetalert2"
import styles from "./jobvancy.module.css"
import {
  getUserPostulations,
  type ResponseGetPostulationDTO,
  type RequestPaginationPostulationDTO,
  EPostulationStatus,
} from "../../services/authService"

const JobVancy: React.FC = () => {
  // State for postulations
  const [postulations, setPostulations] = useState<ResponseGetPostulationDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10) // Cambiar el tamaño de página inicial a 10
  const [totalElements, setTotalElements] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  // Filter state
  const [statusFilter, setStatusFilter] = useState<EPostulationStatus | null>(null)

  // Fetch postulations on component mount and when filters change
  useEffect(() => {
    fetchPostulations()
  }, [page, size, statusFilter])

  // Function to fetch postulations
  const fetchPostulations = async () => {
    try {
      setLoading(true)
      setError(null)

      const filter: RequestPaginationPostulationDTO = {
        page,
        size,
        sortBy: "",
        sortDirection: "ASC",
        status: statusFilter,
      }

      const response = await getUserPostulations(filter)

      if (response && response.content) {
        setPostulations(response.content)
        setTotalElements(response.totalElements || 0)
        setTotalPages(response.totalPages || 10)
      } else {
        setPostulations([])
        setTotalElements(0)
        setTotalPages(0)
      }
    } catch (err) {
      console.error("Error fetching postulations:", err)
      setError("No se pudieron cargar las postulaciones. Por favor, inténtelo de nuevo más tarde.")
      Swal.fire("Error", "No se pudieron cargar las postulaciones", "error")
    } finally {
      setLoading(false)
    }
  }

  // Function to get status badge class
  const getStatusBadgeClass = (status: EPostulationStatus) => {
    switch (status) {
      case EPostulationStatus.PENDING:
        return styles.statusPending
      case EPostulationStatus.ACCEPTED:
        return styles.statusAccepted
      case EPostulationStatus.REJECTED:
        return styles.statusRejected
      default:
        return styles.statusPending
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Function to handle status filter change
  const handleStatusFilterChange = (status: EPostulationStatus | null) => {
    setStatusFilter(status)
    setPage(0) // Reset to first page when filter changes
  }

  // Function to handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  if (loading && postulations.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size={60} style={{ color: "#1b0096" }} thickness={4} />
        <p>Cargando postulaciones...</p>
      </div>
    )
  }

  if (error && postulations.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={fetchPostulations}>Intentar de nuevo</button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Postulaciones</h1>

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label>Filtrar por estado:</label>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${statusFilter === null ? styles.active : ""}`}
              onClick={() => handleStatusFilterChange(null)}
            >
              Todos
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "PENDING" ? styles.active : ""}`}
              onClick={() => handleStatusFilterChange(EPostulationStatus.PENDING)}
            >
              Pendientes
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "ACCEPTED" ? styles.active : ""}`}
              onClick={() => handleStatusFilterChange(EPostulationStatus.ACCEPTED)}
            >
              Aceptadas
            </button>
            <button
              className={`${styles.filterButton} ${statusFilter === "REJECTED" ? styles.active : ""}`}
              onClick={() => handleStatusFilterChange(EPostulationStatus.REJECTED)}
            >
              Rechazadas
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingOverlay}>
          <CircularProgress size={40} style={{ color: "#1b0096" }} thickness={4} />
        </div>
      )}

      {postulations.length === 0 ? (
        <div className={styles.emptyState}>
          <Icon icon="mdi:briefcase-search-outline" className={styles.emptyIcon} />
          <h3>No hay postulaciones</h3>
          <p>
            {statusFilter
              ? `No tienes postulaciones con estado ${statusFilter.toLowerCase()}.`
              : "No has realizado ninguna postulación aún."}
          </p>
          <p>Explora las vacantes disponibles y postúlate a las que te interesen.</p>
        </div>
      ) : (
        <>
          <div className={styles.postulationsGrid}>
            {postulations.map((postulation) => (
              <div key={postulation.id} className={styles.postulationCard}>
                <div className={styles.postulationHeader}>
                  <h3>{postulation.vacant.positionName}</h3>
                  <span className={getStatusBadgeClass(postulation.status)}>
                    {postulation.status === EPostulationStatus.PENDING && "Pendiente"}
                    {postulation.status === EPostulationStatus.ACCEPTED && "Aceptada"}
                    {postulation.status === EPostulationStatus.REJECTED && "Rechazada"}
                  </span>
                </div>

                <div className={styles.postulationCompany}>
                  <Icon icon="mdi:office-building" className={styles.postulationIcon} />
                  {postulation.vacant.area}
                </div>

                <div className={styles.postulationDate}>
                  <Icon icon="mdi:calendar" className={styles.postulationIcon} />
                  Fecha de postulación: {formatDate(postulation.applicationDate)}
                </div>

                <div className={styles.postulationMoney}>
                  <Icon icon="mdi:cash-multiple" className={styles.postulationIcon} />
                  $
                  {postulation.vacant.salary}
                </div>

                <div className={styles.postulationMoney}>
                  <Icon icon="mdi:map-marker-outline" className={styles.postulationIcon} />
                  {postulation.vacant.location}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <div className={styles.paginationInfo}>
                <p>
                  Mostrando {postulations.length > 0 ? page * size + 1 : 0} -{" "}
                  {Math.min((page + 1) * size, totalElements)} de {totalElements} postulaciones
                </p>
              </div>
              <div className={styles.paginationControls}>
                <FormControl variant="outlined" size="small" style={{ width: 120, marginRight: 16 }}>
                  <InputLabel>Por página</InputLabel>
                  <Select
                    value={size}
                    onChange={(e) => {
                      setSize(Number(e.target.value))
                      setPage(0)
                    }}
                    label="Por página"
                    style={{ backgroundColor: "white" }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  count={totalPages}
                  page={page + 1}
                  onChange={handlePageChange}
                  color="primary"
                  size="medium"
                  showFirstButton
                  showLastButton
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#1b0096",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1b0096cc",
                          },
                        },
                        "&.MuiPaginationItem-root": {
                          margin: "0 2px",
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobVancy