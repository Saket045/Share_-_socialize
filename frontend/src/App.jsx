/* eslint-disable no-unused-vars */
import Login from "./login/Login.jsx"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route ,Routes } from "react-router-dom";
import Register from "./register/Register.jsx";
import Home from "./home/Home.jsx";
import { VerifyUser } from "./utils/VerifyUser.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
function App() {
  const {authUser}=useAuth();
  const token = localStorage.getItem('token');
  return (
    <>
    <div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
      <Route path="/login" element={!token ? <Login/>:<Navigate to={"/"}/>}/>
      <Route path="/register" element={!token ? <Register/>:<Navigate to={"/"}/>}/>
        <Route element={<VerifyUser/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>

    </>
  )
}

export default App
