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
import ApplicantDetails from "./pages/dashboard/applicantDetails/ApplicantDetails";
import JobPage from "./pages/jobs/jobPage/jobPage";
import ApplyJob from "./pages/jobs/apply/ApplyJob";
import Pricing from "./pages/Pricing";

export default function App() {
  const { authUser } = useAuthContext();
  return (
    <BrowserRouter>
      <NavBar />
      <div className="h-[66px]" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/log-in"
          element={authUser ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={authUser ? <Navigate to={"/dashboard"} /> : <SignUp />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/"} />}
        />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/details/:id" element={<JobPage />} />
        <Route path="/jobs/apply/:id" element={<ApplyJob />} />

        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/dashboard/create"
          element={authUser ? <CreateJob /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/dashboard/job/:id"
          element={authUser ? <JobDetails /> : <Navigate to={"/log-in"} />}
        />
        <Route
          path="/dashboard/job/applicant/:id"
          element={
            authUser ? <ApplicantDetails /> : <Navigate to={"/log-in"} />
          }
        />
      </Routes>
      
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}
