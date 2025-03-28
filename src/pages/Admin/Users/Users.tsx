"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  CircularProgress,
  Typography,
  Box,
  Modal,
  Button,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  InputAdornment,
  TextField,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Info as InfoIcon, Refresh as RefreshIcon,  Search as SearchIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,} from "@mui/icons-material"
import { getAllPostulants, updatePostulantStatus, getPostulantById } from "../../../services/authService"
import type { PaginationRequestDTO, ResponseGetPostulantsDTO, UpdateUserStatusDTO } from "../../../services/authService"
import styles from "./users.module.css"

// Custom styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "20px auto",
  maxWidth: "1200px",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  overflow: "hidden",
  border: "1px solid rgba(27, 0, 150, 0.1)",
}))

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: "#1b0096",
}))

const StyledHeaderCell = styled(TableCell)(() => ({
  color: "white",
  fontWeight: "bold",
  fontSize: "0.9rem",
  padding: "16px",
}))

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(27, 0, 150, 0.03)",
  },
  "&:hover": {
    backgroundColor: "rgba(27, 0, 150, 0.07)",
    transition: "background-color 0.2s ease",
  },
}))

const StyledSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#1b0096",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#1b0096",
  },
}))

const StyledModalContent = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  padding: "0",
  outline: "none",
}))

const ModalHeader = styled(Box)(() => ({
  backgroundColor: "#1b0096",
  color: "white",
  padding: "16px 24px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const ModalBody = styled(Box)(() => ({
  padding: "24px",
}))

const ModalFooter = styled(Box)(() => ({
  padding: "16px 24px",
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
}))

const UserInfoItem = styled(Box)(() => ({
  display: "flex",
  marginBottom: "12px",
}))

const UserInfoLabel = styled(Typography)(() => ({
  fontWeight: "bold",
  width: "140px",
  color: "#090030",
}))

const UserInfoValue = styled(Typography)(() => ({
  flex: 1,
}))

const EmailButton = styled(Button)(() => ({
  color: "#1b0096",
  textTransform: "none",
  fontWeight: "normal",
  "&:hover": {
    backgroundColor: "rgba(27, 0, 150, 0.05)",
  },
}))

const RefreshButton = styled(IconButton)(() => ({
  color: "#1b0096",
  marginBottom: "16px",
}))

const StatusChip = styled(Chip)(({ status }: { status: boolean }) => ({
  backgroundColor: status ? "rgba(46, 125, 50, 0.1)" : "rgba(211, 47, 47, 0.1)",
  color: status ? "#2e7d32" : "#d32f2f",
  fontWeight: "bold",
  marginLeft: "8px",
}))

type SortField = "userId" | "name" | "email" | "firstLastName" | null
type SortDirection = "asc" | "desc"

const Users: React.FC = () => {
  const [users, setUsers] = useState<ResponseGetPostulantsDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<ResponseGetPostulantsDTO | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const filter: PaginationRequestDTO = {
        page: 0,
        size: 100,
      }
      const response = await getAllPostulants(filter)
      setUsers(response.content)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Toggle user status
  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const request: UpdateUserStatusDTO = {
        userId,
        status: !currentStatus,
      }
      await updatePostulantStatus(request)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.userId === userId ? { ...user, status: !currentStatus } : user)),
      )
    } catch (err) {
      console.error("Error updating user status:", err)
      setError("Failed to update user status. Please try again.")
    }
  }

  // Fetch user details and open modal
  const handleEmailClick = async (id: number) => {
    try {
      const user = await getPostulantById({ id })
      setSelectedUser(user)
      setModalOpen(true)
    } catch (err) {
      console.error("Error fetching user details:", err)
      setError("Failed to load user details. Please try again later.")
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Get user initials for avatar
  const getUserInitials = (name: string, firstLastName: string) => {
    return `${name.charAt(0)}${firstLastName.charAt(0)}`.toUpperCase()
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? (
      <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5, color: "#1b0096" }} />
    ) : (
      <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5, color: "#1b0096" }} />
    )
  }

  const filterUsers = (users: ResponseGetPostulantsDTO[]) => {
    if (!searchTerm.trim()) return users

    const searchTermLower = searchTerm.toLowerCase()

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.firstLastName.toLowerCase().includes(searchTermLower) ||
        (user.secondLastName && user.secondLastName.toLowerCase().includes(searchTermLower)),
    )
  }

  const sortUsers = (users: ResponseGetPostulantsDTO[]) => {
    if (!sortField) return users

    return [...users].sort((a, b) => {
      let valueA = a[sortField]
      let valueB = b[sortField]

      // Handle string comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress style={{ color: "#1b0096" }} />
        <Typography style={{ color: "#090030" }}>Loading users...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className={styles.errorContainer}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" style={{ backgroundColor: "#1b0096", marginTop: "16px" }} onClick={fetchUsers}>
          Try Again
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Box className={styles.headerContainer}>
        <Typography variant="h4" className={styles.applicantstitle}>
          User Management
        </Typography>
        <Typography variant="body1" className={styles.applicantsSubtitle}>
          Manage user accounts and control their access to the platform.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <TextField
          placeholder="Search by name, email or last names..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "350px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(27, 0, 150, 0.3)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1b0096",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(9, 0, 48, 0.5)" }} />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Refresh users">
          <RefreshButton onClick={fetchUsers}>
            <RefreshIcon />
          </RefreshButton>
        </Tooltip>
      </Box>

      <StyledTableContainer as={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledHeaderCell onClick={() => handleSort("userId")} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>ID {getSortIcon("userId")}</Box>
              </StyledHeaderCell>
              <StyledHeaderCell onClick={() => handleSort("name")} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>User {getSortIcon("name")}</Box>
              </StyledHeaderCell>
              <StyledHeaderCell onClick={() => handleSort("email")} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>Email {getSortIcon("email")}</Box>
              </StyledHeaderCell>
              <StyledHeaderCell onClick={() => handleSort("firstLastName")} sx={{ cursor: "pointer" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>Last Names {getSortIcon("firstLastName")}</Box>
              </StyledHeaderCell>
              <StyledHeaderCell align="center">Status</StyledHeaderCell>
              <StyledHeaderCell align="center">Actions</StyledHeaderCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {sortUsers(filterUsers(users)).map((user) => (
              <StyledTableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#1b0096",
                        width: 36,
                        height: 36,
                        marginRight: "12px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {getUserInitials(user.name, user.firstLastName)}
                    </Avatar>
                    <Typography>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <EmailButton onClick={() => handleEmailClick(user.userId)}>{user.email}</EmailButton>
                </TableCell>
                <TableCell>
                  {user.firstLastName} {user.secondLastName}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={user.status ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      backgroundColor: user.status ? "rgba(46, 125, 50, 0.1)" : "rgba(211, 47, 47, 0.1)",
                      color: user.status ? "#2e7d32" : "#d32f2f",
                      fontWeight: "medium",
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={user.status ? "Disable User" : "Enable User"}>
                    <StyledSwitch
                      checked={user.status}
                      onChange={() => handleToggleStatus(user.userId, user.status)}
                      size="small"
                    />
                  </Tooltip>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => handleEmailClick(user.userId)}
                      sx={{ color: "#1b0096", ml: 1 }}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Modal for user details */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <StyledModalContent>
          {selectedUser ? (
            <>
              <ModalHeader>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "#1b0096",
                      marginRight: "12px",
                    }}
                  >
                    {getUserInitials(selectedUser.name, selectedUser.firstLastName)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedUser.name} {selectedUser.firstLastName}
                    </Typography>
                    <Typography variant="body2">
                      User ID: {selectedUser.userId}
                      <StatusChip
                        label={selectedUser.status ? "Active" : "Inactive"}
                        size="small"
                        status={selectedUser.status}
                      />
                    </Typography>
                  </Box>
                </Box>
              </ModalHeader>

              <ModalBody>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#090030", mb: 2 }}>
                  Personal Information
                </Typography>

                <UserInfoItem>
                  <UserInfoLabel variant="body2">Email:</UserInfoLabel>
                  <UserInfoValue variant="body2">{selectedUser.email}</UserInfoValue>
                </UserInfoItem>

                <UserInfoItem>
                  <UserInfoLabel variant="body2">Full Name:</UserInfoLabel>
                  <UserInfoValue variant="body2">
                    {selectedUser.name} {selectedUser.firstLastName} {selectedUser.secondLastName}
                  </UserInfoValue>
                </UserInfoItem>

                <UserInfoItem>
                  <UserInfoLabel variant="body2">Phone Number:</UserInfoLabel>
                  <UserInfoValue variant="body2">{selectedUser.phoneNumber || "Not provided"}</UserInfoValue>
                </UserInfoItem>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#090030", mb: 2 }}>
                  Location Information
                </Typography>

                <UserInfoItem>
                  <UserInfoLabel variant="body2">Country:</UserInfoLabel>
                  <UserInfoValue variant="body2">{selectedUser.adressCountry || "Not provided"}</UserInfoValue>
                </UserInfoItem>

                <UserInfoItem>
                  <UserInfoLabel variant="body2">State:</UserInfoLabel>
                  <UserInfoValue variant="body2">{selectedUser.adressState || "Not provided"}</UserInfoValue>
                </UserInfoItem>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{
                    borderColor: "#1b0096",
                    color: "#1b0096",
                    "&:hover": {
                      borderColor: "#090030",
                      backgroundColor: "rgba(27, 0, 150, 0.05)",
                    },
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <CircularProgress style={{ color: "#1b0096" }} />
              <Typography sx={{ mt: 2 }}>Loading user details...</Typography>
            </Box>
          )}
        </StyledModalContent>
      </Modal>
    </Box>
  )
}

export default Users

