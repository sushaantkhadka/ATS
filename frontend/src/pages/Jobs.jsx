import { useEffect, useState } from "react";
import { uploadFile } from "@uploadcare/upload-client";
import "@uploadcare/react-uploader/core.css";

export default function Jobs() {
  const [resumeFile, setResumeFile] = useState(null);
  const [fileData, setFileData] = useState(undefined);
  const handleChange = async (e) => {
    setFileData(e.target.value);
    const result = await uploadFile(fileData, {
      publicKey: import.meta.env.VITE_UPLOAD_CARE_API_KEY,
      store: "auto",
      metadata: {
        subsystem: "js-client",
        pet: "cat",
      },
    });
    setResumeFile(result.cdnUrl)
  };

  useEffect(() => {
    console.log(resumeFile);
    
  },[resumeFile]);
  

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
}
