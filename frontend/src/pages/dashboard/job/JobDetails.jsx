"use client"

import { Button } from "@/components/ui/button"
import { Download, Briefcase, MapPin, Calendar, Search, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"

export default function JobDetails() {
  const { id } = useParams()
  const [applicants, setApplicants] = useState([])
  const [jobDetails, setJobDetails] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [matchFilter, setMatchFilter] = useState("Match %")
  const [filteredApplicants, setFilteredApplicants] = useState([])
  const [showFullDescription, setShowFullDescription] = useState(false)

  const numberOfApplicants = applicants.length

  const handleJobStatus = async (value) => {
    try {
      const status = value === "true"

      const res = await fetch(`/api/listing/job/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      })
      const data = await res.json()
      if (data.success === false) {
        throw new Error(data.message)
      }
      setJobDetails({ ...jobDetails, status })
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error("Failed to update job status")
    }
  }

  useEffect(() => {
    const getApplicant = async () => {
      try {
        const res = await fetch(`/api/listing/applicants/${id}`)
        const data = await res.json()
        setApplicants(data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    const getJobDetails = async () => {
      try {
        const res = await fetch(`/api/listing/job/${id}`)
        const data = await res.json()
        setJobDetails(data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    getJobDetails()
    getApplicant()
  }, [id])

  useEffect(() => {
    let filtered = [...applicants]

    if (searchQuery) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.resumeType.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (roleFilter !== "All Roles") {
      filtered = filtered.filter((applicant) => applicant.resumeType === roleFilter)
    }

    if (matchFilter !== "Match %") {
      switch (matchFilter) {
        case "Highest Match":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "Lowest Match":
          filtered.sort((a, b) => a.rating - b.rating)
          break
      }
    }

    setFilteredApplicants(filtered)
  }, [applicants, searchQuery, roleFilter, matchFilter])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const formatApplicationDate = (dateString) => {
    return `Applied on ${new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString))}`
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text
    const truncated = text.substr(0, maxLength)
    return truncated.substr(0, truncated.lastIndexOf(" ")) + "..."
  }

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
        <span className="font-medium text-foreground">Job Details</span>
      </div>

      {/* Job Details Section */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{jobDetails.title}</CardTitle>
                <p className="text-muted-foreground">{jobDetails.companyName}</p>
              </div>
              <Select onValueChange={handleJobStatus} value={jobDetails.status? "true" : "false"}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Job Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Open</SelectItem>
                  <SelectItem value="false">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {jobDetails.jobType}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {jobDetails.location}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {jobDetails.updatedAt && formatDate(jobDetails.updatedAt)}
              </Badge>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                {showFullDescription ? (
                  <ReactMarkdown>{jobDetails.desc || ""}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{truncateDescription(jobDetails.desc || "", 150)}</ReactMarkdown>
                )}
              </div>
              {jobDetails.desc && jobDetails.desc.length > 150 && (
                <Button
                  variant="link"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 p-0"
                >
                  {showFullDescription ? (
                    <>
                      View Less <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold">{numberOfApplicants}</p>
              <p className="text-muted-foreground">Total Applicants</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applicants Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Applicants</h2>
            <p className="text-muted-foreground">Manage and review job applicants for your open positions.</p>
          </div>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applicants..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Roles">All Roles</SelectItem>
              {Array.from(new Set(applicants.map((a) => a.resumeType))).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={matchFilter} onValueChange={setMatchFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Match %" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Match %">Match %</SelectItem>
              <SelectItem value="Highest Match">Highest Match</SelectItem>
              <SelectItem value="Lowest Match">Lowest Match</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Predicted Role</TableHead>
              <TableHead>Experience (Years)</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Match %</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${applicant.name}`} />
                      <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{applicant.name}</div>
                      <div className="text-sm text-muted-foreground">{formatApplicationDate(applicant.createdAt)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{applicant.resumeType}</TableCell>
                <TableCell>{applicant.exp} years</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={applicant.pdfUrl}
                      target="_blank"
                      download={applicant.name}
                      className="flex items-center gap-2"
                      rel="noreferrer"
                    >
                      <Download className="w-4 h-4" /> Resume
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.floor(applicant.rating)} className="w-[60px]" />
                    <span>{Math.floor(applicant.rating)}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/dashboard/job/applicant/${applicant._id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

