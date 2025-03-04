import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);

    const logout = async () => {
        setloading(true)
        try{
            const res = await fetch("api/auth/logout",{
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            if(data.success == false) {
                toast.error(data.message)
                throw new Error(data);
            }
            navigate("/")
            setAuthUser(null)
            localStorage.removeItem("login-user")
            toast.success("Logged out successfully")
        } catch(error){
            toast.error(error.message)
        }finally {
            setloading(false)
        }
    }

    return {logout, loading}
}

export default useLogout;