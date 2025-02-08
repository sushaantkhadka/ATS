import { useState } from "react";
import toast from "react-hot-toast";

const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
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
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useProfileUpdate;
