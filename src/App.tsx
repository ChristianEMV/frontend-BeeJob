import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Jobs from './pages/Job';
import Profile from './pages/Profile/Profile';
import AdminHome from './pages/Admin/Home/AdminHome';
import AdminNavbar from './components/AdminNavbar/AdminNav';
import AdminJob from "./pages/Admin/Jobs/Job";
import './App.css'

const App = () => {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminjob" element={<AdminJob />} />
      </Routes>
    </Router>
  )
}

export default App
