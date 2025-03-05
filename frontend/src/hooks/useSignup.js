import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const signup = async ({ username, email, password, confirmPassword }) => {
    const success = _handleInputError({
      username,
      email,
      password,
      confirmPassword,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        toast.error(data.message)
        throw new Error(data);
      }
      navigate('/log-in')
      toast.success("Account Created Successfully")

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function _handleInputError({ username, email, password, confirmPassword }) {
  if (!username || !password || !confirmPassword || !email) {
    toast.error("Please fill all fields!");
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}

export default useSignup;
