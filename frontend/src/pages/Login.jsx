import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import OAuth from "../components/OAuth/OAuth";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, login } = useLogin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="bg-gray-100 p-5 my-40 rounded-2xl border-gray-500 border-1 shadow-xl max-w-md mx-auto ">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-500">login to gain access</p>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-white rounded-lg py-1 px-3 border-slate-300 border-1 outline-none text-gray-500"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-white rounded-lg py-1 px-3 border-slate-300 border-1 outline-none text-gray-500"
          onChange={handleChange}
        />
        <button className="bg-slate-700 rounded-lg py-1 text-white hover:bg-slate-600">
          {loading ? "LOADING..." : "Login"}
        </button>
      </form>

      <OAuth />

      <div className="flex gap-2 text-gray-500 justify-center">
        <p>Don&apos;t have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500 font-medium">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
