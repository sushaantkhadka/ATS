import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  
  const login = async ({ username, password }) => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data.message);

      if (data.success == false) {
        toast.error(data.message);        
        setLoading(false);
        throw new Error(data);
      }
      navigate("/");
      toast.success("Successfully logged in");

      localStorage.setItem("login-user", JSON.stringify(data));
      setAuthUser(data);


    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
