"use client"

import { useRef, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { uploadFile } from "@uploadcare/upload-client"
import "@uploadcare/react-uploader/core.css"
import toast from "react-hot-toast"
import useProfileUpdate from "../hooks/useProfileUpdate"
import useLogout from "../hooks/useLogout"
import useUserDelete from "../hooks/useUserDelete"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Upload, User } from "lucide-react"

export default function Profile() {
  const { authUser } = useAuthContext()
  const [uploadStat, setUploadStat] = useState(false)
  const [formData, setFormData] = useState({})
  const { updateProfile, loading } = useProfileUpdate()
  const { logout } = useLogout()
  const { userDelete } = useUserDelete()

  const fileRef = useRef(null)

  const handleLogout = () => {
    logout()
  }

  const handleDelete = () => {
    userDelete()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
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
            subsystem: "js-client",
            pet: "cat",
          },
        })
        setFormData({ ...formData, profileImage: result.cdnUrl })
        toast.success("Image Successfully uploaded")
      } else {
        toast.error("Unable to upload file. Please try again!")
      }
    } catch (error) {
      toast.error("Error uploading image")
    } finally {
      setUploadStat(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
          <CardDescription className="text-center">Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} hidden />
              <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileRef.current.click()}>
                <AvatarImage
                  src={formData.profileImage || authUser.profileImage}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              {uploadStat ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => fileRef.current.click()}
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
              )}
              <p className="text-sm text-muted-foreground text-center">
                *.png, *.jpeg files up to 10MB at least 400px by 400px
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder={authUser.username}
                  onChange={handleChange}
                  defaultValue={authUser.username}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder={authUser.email}
                  onChange={handleChange}
                  defaultValue={authUser.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input type="password" id="password" placeholder="Enter new password" onChange={handleChange} />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete Account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

