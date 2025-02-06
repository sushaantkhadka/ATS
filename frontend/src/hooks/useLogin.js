import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async ({ username, password }) => {
    try {
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
      if (data.error) {
        throw new Error(data.error);
      }
      navigate('/')
      toast.success('Successfully logged in')

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
