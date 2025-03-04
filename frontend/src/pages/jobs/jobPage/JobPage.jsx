"use client"

import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Calendar, ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from "react-markdown"

export default function JobPage() {
  const { authUser } = useAuthContext()
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/job/${id}`)
        const data = await res.json()
        if (data.success === false) {
          throw new Error(data)
        }
        setJob(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getJobDetails()
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-4 w-40 mb-4" />
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
              <CardDescription className="text-xl">{job.companyName}</CardDescription>
            </div>
            {!authUser && (
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link to={`/jobs/apply/${id}`}>Apply Now</Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              {job.jobType}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Posted on {formatDate(job.createdAt)}
            </Badge>
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown>{job.desc}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Floating Apply Now button for mobile */}
      {!authUser && (
        <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
          <Button asChild size="lg" className="w-full">
            <Link to={`/jobs/apply/${id}`}>Apply Now</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

