import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtecedRoute"
import Login from "./pages/Login"
import SignUp from "./pages/signup"
import CustomerPage from "./pages/CustomerPage"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Tasks from "./pages/Tasks"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/customer" element={<ProtectedRoute><CustomerPage/></ProtectedRoute>}/>
      <Route path="/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
    </Routes>
  )
}

export default App
