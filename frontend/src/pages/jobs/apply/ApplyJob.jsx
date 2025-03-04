"use client"

import { uploadFile } from "@uploadcare/upload-client"
import "@uploadcare/react-uploader/core.css"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"

export default function ApplyJob() {
  const { id } = useParams()
  const fileRef = useRef(null)
  const [uploadStat, setUploadStat] = useState(false)
  const [formData, setFormData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const res = await fetch(`/api/listing/upload/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      toast.success(data.message)
      navigate(`/jobs/details/${id}`)
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting your application")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleUpload = async (e) => {
    try {
      setUploadStat(true)
      const fileData = e.target.files[0]
      if (fileData) {
        const result = await uploadFile(fileData, {
          publicKey: import.meta.env.VITE_UPLOAD_CARE_API_KEY,
          store: "auto",
          metadata: {
            subsystem: "js-client"
          },
        })
        setFormData({ ...formData, pdfUrl: result.cdnUrl })
        toast.success("Resume Successfully uploaded")
      } else {
        toast.error("Unable to upload file. Please try again!")
      }
    } catch (error) {
      toast.error("Error uploading resume")
    } finally {
      setUploadStat(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/jobs/details/${id}`}
        className="text-sm text-muted-foreground hover:text-primary flex items-center mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Details
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Apply for Job</CardTitle>
          <CardDescription>Fill out the form below to submit your application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Enter your name" onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exp">Years of Experience</Label>
              <Input type="number" id="exp" placeholder="Enter your experience" onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="example@abc.com" onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Contact No.</Label>
              <Input type="tel" id="phone" placeholder="Ex: 9874563210" onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverletter">Why should we hire you?</Label>
              <Textarea id="coverletter" placeholder="Write here..." onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Upload your resume</Label>
              <input type="file" ref={fileRef} accept=".pdf" onChange={handleUpload} hidden />
              <Button
                onClick={() => fileRef.current.click()}
                type="button"
                variant="outline"
                disabled={uploadStat}
                className="w-full"
              >
                {uploadStat ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resume
                  </>
                )}
              </Button>
              {formData.pdfUrl && <p className="text-sm text-muted-foreground mt-2">Resume uploaded successfully</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={submitting || !formData.pdfUrl} onClick={handleSubmit}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

