import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { useAuthContext } from "./context/AuthContext";
import Jobs from "./pages/Jobs";

export default function App() {
  const {authUser} = useAuthContext();
  return (
    <BrowserRouter>
      <NavBar />
      <div className="h-[66px]" />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={authUser? <Navigate to={'/profile'}/> : <Login /> } />
        <Route path="/sign-up" element={authUser? <Navigate to={'/profile'}/> : <SignUp />} />
        <Route path="/profile" element={authUser? <Profile /> :  <Navigate to={'/'}/>} />
        <Route path="/jobs" element={<Jobs />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
