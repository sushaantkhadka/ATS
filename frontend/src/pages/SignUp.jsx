import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import OAuth from "../components/OAuth/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const {loading, signup} = useSignup();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-gray-100 p-5 rounded-2xl border-gray-500 border-1 shadow-xl w-[420px] ">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p className="text-gray-500">Sign up to gain access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-white rounded-lg py-1 px-3 border-slate-300 border-1 outline-none text-gray-500"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
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
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            className="bg-white rounded-lg py-1 px-3 border-slate-300 border-1 outline-none text-gray-500"
            onChange={handleChange}
          />
          <button disabled={loading} className="bg-slate-700 rounded-lg py-1 text-white hover:bg-slate-600">
            {loading? "LOADING..." :"Signup"}
          </button>
        </form>

        <OAuth />

        <div className="flex gap-2 text-gray-500 justify-center">
          <p>Already have an account?</p>
          <Link to={"/log-in"}>
            <span className="text-blue-500 font-medium">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
