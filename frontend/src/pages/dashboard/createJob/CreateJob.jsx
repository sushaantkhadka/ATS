"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Briefcase, Building, MapPin } from "lucide-react"
import MarkdownEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import ReactMarkdown from "react-markdown"

export default function CreateJob() {
  const { authUser } = useAuthContext()
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

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
  ]

  const jobTypes = [{ type: "Remote" }, { type: "Hybrid" }, { type: "Onsite" }]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value, fieldName) => {
    setFormData({ ...formData, [fieldName]: value })
  }

  const handleEditorChange = ({ text }) => {
    setFormData({ ...formData, desc: text })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        toast.error("Failed to create job. Please try again!")
        throw new Error(data)
      }

      navigate("/dashboard")
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFormData({ userId: authUser?._id })
  }, [authUser])

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">Create Job</span>
      </div>

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
        <Button variant="outline" className="mt-4 md:mt-0" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the information below to create a new job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="pl-10"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "category")} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category.category}>
                        {category.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    placeholder="e.g. Acme Inc."
                    className="pl-10"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "jobType")} required>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((jobtype, index) => (
                      <SelectItem key={index} value={jobtype.type}>
                        {jobtype.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="e.g. New York, NY (or Remote)"
                  className="pl-10"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Job Description</Label>
              <MarkdownEditor
                id="desc"
                value={formData.desc || ""}
                onChange={handleEditorChange}
                renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                className="min-h-[300px]"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8">
                Post Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

