import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const { authUser } = useAuthContext();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const categories = [
    { category: "Software Development" },
    { category: "Data Science & Analytics" },
    { category: "Cybersecurity & IT Security" },
    { category: "Cloud Computing & DevOps" },
    { category: "Engineering & Manufacturing" },
    { category: "Design & Creative Arts" },
    { category: "Business & Management" },
    { category: "Human Resources & Recruitment" },
    { category: "Legal & Compliance" },
    { category: "Health & Wellness" },
    { category: "Sales & Marketing" },
    { category: "Project & Operations Management" },
    { category: "Automation & Software Testing" },
    { category: "Finance & Accounting" },
    { category: "Customer Support & Services" },
    { category: "Education & Training" },
    { category: "Research & Development" },
    { category: "Construction & Civil Engineering" },
    { category: "Retail & E-commerce" },
    { category: "Telecommunications & Networking" },
    { category: "Hospitality & Tourism" },
    { category: "Media & Communications" },
    { category: "Government & Public Administration" },
    { category: "Energy & Environmental Science" },
    { category: "Transportation & Logistics" },
  ];

  const jobTypes = [{ type: "Remote" }, { type: "Hybrid" }, { type: "Onsite" }];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success == false) {
        toast.error("Failed to create job. Please try again!");
        throw new Error(data);
      }

      navigate("/dashboard");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({ userId: authUser._id });
  }, [authUser]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          id="title"
          onChange={handleChange}
          required
        />
        <select id="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Company Name"
          id="companyName"
          onChange={handleChange}
          required
        />
        <select id="jobType" onChange={handleChange} required>
          <option value="">Select Category</option>
          {jobTypes.map((jobtype, index) => (
            <option key={index} value={jobtype.type}>
              {jobtype.type}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location"
          id="location"
          onChange={handleChange}
          required
        />
        <input
          type="textarea"
          placeholder="Job Description"
          id="desc"
          onChange={handleChange}
          required
        />
        <Button>Post</Button>
      </form>
    </div>
  );
}
