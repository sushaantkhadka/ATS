import "@uploadcare/react-uploader/core.css";
import { uploadFile } from "@uploadcare/upload-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Jobs() {
  const [formData, setFormData] = useState({});
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
  },[])
  

  const handleChange = async (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      const result = await uploadFile(fileData, {
        publicKey: import.meta.env.VITE_UPLOAD_CARE_API_KEY,
        store: "auto",
        metadata: {
          subsystem: "js-client",
          pet: "cat",
        },
      });
      setFormData({ ...formData, pdfUrl: result.cdnUrl });
      toast.success("File successfully uploaded");
    } else {
      toast.error("Unable to upload file. Please try again!");
    }
  };

  return (
    <div>
      {/* <input type="file" onChange={handleChange} accept=".pdf" /> */}
      
      {jobs.map((job, idx)=> (
        <div key={idx}>
          <h1 className=""  >{job.title}</h1>
        </div>
      ))}

      
    </div>
  );
}
