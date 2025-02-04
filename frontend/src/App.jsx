import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="h-[66px]" />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
