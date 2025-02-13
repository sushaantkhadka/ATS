import { useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { uploadFile } from "@uploadcare/upload-client";
import "@uploadcare/react-uploader/core.css";
import toast from "react-hot-toast";
import useProfileUpdate from "../hooks/useProfileUpdate";
import useLogout from "../hooks/useLogout";
import useUserDelete from "../hooks/useUserDelete";

export default function Profile() {
  const { authUser } = useAuthContext();
  const [fileData, setFileData] = useState(undefined);
  const [uploadStat, setUploadStat] = useState(false);
  const [formData, setFormData] = useState({});
  const { updateProfile, loading } = useProfileUpdate();
  const {logout} = useLogout();
  const {userDelete} = useUserDelete();

  const fileRef = useRef(null);

  const handleLogout = () => {
    logout()
  }
  const handleDelete = () => {
    userDelete()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleUpload = async (e) => {
    try {
      setUploadStat(true);
      setFileData(e.target.files[0]);
      const result = await uploadFile(fileData, {
        publicKey: import.meta.env.VITE_UPLOAD_CARE_API_KEY,
        store: "auto",
        metadata: {
          subsystem: "js-client",
          pet: "cat",
        },
      });

      toast.success("Image Successfully uploaded");
      setFormData({ ...formData, profileImage: result.cdnUrl });
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploadStat(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
        <img
          src={
            formData.profileImage
              ? formData.profileImage
              : authUser.profileImage
          }
          alt="profile image"
          className="h-24 w-24 rounded-full object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
        {uploadStat ? (
          <span className="text-green-700 text-center text-sm">Uploading</span>
        ) : (
          ""
        )}
        <p className="text-slate-400 text-center">
          *.png, *.jpeg files up to 10MB at least 400px by 400px
        </p>

        <label className="font-medium">Username</label>
        <input
          type="text"
          id="username"
          placeholder={authUser.username}
          className="bg-slate-100 rounded-lg p-3 border-none outline-none"
          onChange={handleChange}
        />

        <label className="font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder={authUser.email}
          className="bg-slate-100 rounded-lg p-3 border-none outline-none"
          onChange={handleChange}
        />
        <label className="font-medium">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 border-none outline-none"
          onChange={handleChange}
        />
        <button className="bg-slate-700 rounded-lg py-2 text-white hover:bg-slate-600 cursor-pointer">
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </form>

      <div className="text-red-700 flex justify-between px-2 my-2">
        <span onClick={handleDelete} className="cursor-pointer">Delete</span>
        <span onClick={handleLogout} className="cursor-pointer">Logout</span>
      </div>
    </div>
  );
}
