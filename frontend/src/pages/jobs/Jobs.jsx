import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import "@uploadcare/react-uploader/core.css";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const categories = ["All", ...new Set(jobs.map((job) => job.category))]
  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobs.filter((job) => {
    const isOpen = job.status === true;
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    return isOpen && matchesCategory && matchesSearch
  })
  

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="relative mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap transition-colors",
                "hover:bg-primary/90 hover:text-primary-foreground",
                selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found matching your criteria.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job._id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{job.companyName}</p>
                <p className="text-sm text-muted-foreground">{job.location}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-muted">{job.jobType}</span>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-muted">{job.category}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{job.updatedAt}</span>
                <Button asChild>
                  <Link to={`/job/${job.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
