import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { useAuthContext } from "./context/AuthContext";
import Jobs from "./pages/jobs/Jobs";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateJob from "./pages/dashboard/createJob/createJob";
import JobDetails from "./pages/dashboard/job/JobDetails";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create" element={<CreateJob />} />
        <Route path="/dashboard/job/:id" element={<JobDetails />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
