"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, Briefcase, Mail, Phone, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"

export default function ApplicantDetails() {
  const { id } = useParams()
  const [applicant, setApplicant] = useState(null)

  useEffect(() => {
    const getApplicant = async () => {
      try {
        const res = await fetch(`/api/listing/applicant/${id}`)
        const data = await res.json()
        setApplicant(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getApplicant()
  }, [id])

  if (!applicant) {
    return <div className="container mx-auto px-4 py-6">Loading...</div>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
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
        <Link to="/dashboard/job" className="hover:text-primary">
          Job
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">Applicant Details</span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Applicant Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{applicant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {applicant.resumeType}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {applicant.exp} years experience
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{applicant.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{applicant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Uploaded at: {formatDate(applicant.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Percentage */}
        <Card>
          <CardHeader>
            <CardTitle>Match Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold">{Math.floor(applicant.rating)}%</p>
              <p className="text-muted-foreground">Match Score</p>
            </div>
            <Progress value={applicant.rating} className="w-full h-2" />
          </CardContent>
        </Card>

        {/* Cover Letter */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{applicant.coverletter}</p>
          </CardContent>
        </Card>

        {/* Resume Download */}
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href={applicant.pdfUrl} target="_blank" download={applicant.name} className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

