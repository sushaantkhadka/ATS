import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { authUser } = useAuthContext();
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  
  

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch("/api/listing/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getJobs();
  }, []);
  return (
    <div>
      <Button asChild>
        <Link to={"/dashboard/create"}>Post Job</Link>
      </Button>

      <div>
        <div className="flex gap-20">
          <p>Job Title</p>
          <p>Category</p>
          <p>Type</p>
          <p>Last Modified</p>
          <p>Action</p>
        </div>

          {jobs.map((job, index) => (
            <div className="flex gap-20" key={index}>
              <p>{job.title}</p>
              <p>{job.category}</p>
              <p>{job.jobType}</p>
              <p>{job.updatedAt}</p>
              <Button><Link to={`/dashboard/job/${job._id}`}>View Details</Link></Button>
              </div>
          ))}

      </div>
    </div>
  );
}
