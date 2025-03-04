"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Clock, Eye, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const numberOfJobs = jobs.length
  const openJobs = jobs.filter((job) => job.status === true)
  const closedJobs = jobs.filter((job) => job.status === false)

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await fetch("/api/listing/jobs")
        const data = await res.json()
        setJobs(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getJobs()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const JobTable = ({ jobs }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
              No jobs found in this category.
            </TableCell>
          </TableRow>
        ) : (
          jobs.map((job, index) => (
            <TableRow key={index} className="group">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {job.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`capitalize ${
                    job.jobType === "full-time"
                      ? "bg-blue-100 text-blue-800"
                      : job.jobType === "part-time"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {job.jobType}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(job.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/dashboard/job/${job._id}`}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">Dashboard</span>
      </div>

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Job Dashboard</h1>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/dashboard/create">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Link>
        </Button>
      </div>

      {/* Analytics cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-primary mr-2" />
              <div className="text-3xl font-bold">{numberOfJobs}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-3xl font-bold">{openJobs.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-sm font-medium">
                {jobs.length > 0 ? formatDate(jobs[0].updatedAt) : "No jobs yet"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs tables */}
      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="open" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="open">Open Jobs ({openJobs.length})</TabsTrigger>
              <TabsTrigger value="closed">Closed Jobs ({closedJobs.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="open">
              <JobTable jobs={openJobs} />
            </TabsContent>
            <TabsContent value="closed">
              <JobTable jobs={closedJobs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

