import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="h-[90vh] flex flex-col items-center justify-center text-center text-slate-600 gap-5">
        <h1 className="text-4xl font-medium ">We are ResumeAi</h1>
        <p> AI-driven insights, and applicant matching, candidate management <br/> becomes a seamless task.</p>
        <Link to={"/log-in"} className="bg-slate-100 hover:bg-slate-200 shadow-lg px-4 py-2 rounded-full">Join Now for free</Link>
      </div>
      <div>
        
      </div>
    </div>
  )
}
