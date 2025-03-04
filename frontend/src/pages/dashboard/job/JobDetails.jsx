import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

export default function JobDetails() {
    const {id : id} = useParams()
    const [applicants ,setApplicants] =useState([]);
    const noApplicants = applicants.length
    console.log(noApplicants);
    
    
    

    useEffect(() => {
        const getJobs = async () => {
          try {
            const res = await fetch(`/api/listing/applicant/${id}`);
            const data = await res.json();
            setApplicants(data);
          } catch (error) {
            toast.error(error.message);
          }
        };
        getJobs();
      }, [id]);
      
  return (
    <div>
        {applicants.map((applicant,index) => (
            <p key={index}>{applicant.name}</p>
        ))}
    </div>
  )
}
