import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUserDelete = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const userDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${authUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      toast.success("User successfully deleted");
      localStorage.removeItem("login-user");
      setAuthUser(null);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return { userDelete };
};

export default useUserDelete;
