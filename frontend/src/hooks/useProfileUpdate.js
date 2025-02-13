import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const updateProfile = async ({ username, email, password, profileImage }) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/update/${authUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          profileImage
        }),
      });
      const data = await res.json();
      

      if (data.success == false) {
        toast.error(data.message);
        setLoading(false);
        throw new Error(data);
      }

      toast.success("Profile Updated Successfully");
      localStorage.setItem("login-user", JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useProfileUpdate;
