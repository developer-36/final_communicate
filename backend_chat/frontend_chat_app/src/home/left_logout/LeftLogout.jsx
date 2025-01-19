/* eslint-disable no-unused-vars */
import { useState } from "react";
import Cookies from "js-cookie"
import axios from "axios"
import { TbLogout2 } from "react-icons/tb";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LeftLogout = () => {
  const [loading, setLoading] = useState(false);
  const [,,logout] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messanger");
      Cookies.remove("jwt_token");
      console.log("===========> logout");
    setLoading(false);
    toast.success("Logout successfully");
    logout();
    console.log("===========> logout");

    navigate("/login");

    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <div className="h-screen p-4 bg-slate-900 flex  flex-col justify-end
    ">
  {/* Other content */}
  <TbLogout2 className="text-bold text-4xl self-center hover:bg-gray-600 rounded-lg" onClick={handleLogout}/>
</div>
  )
}

export default LeftLogout