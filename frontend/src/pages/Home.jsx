import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BarChart, CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Hiring Process with ResumeAI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  AI-powered resume shortlisting and ATS system that saves time and finds the best candidates.
                </p>
              </div>
              <div className="space-x-4">
               <Link to={"/log-in"}><Button>Get Started</Button></Link>
                <Link to={"/pricing"}><Button variant="outline">Learn More</Button></Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-bold">Intelligent Shortlisting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI-powered algorithm to identify the most qualified candidates.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-bold">Advanced Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Gain insights into your applicant pool and hiring process.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-bold">Automated Screening</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Save time with automated initial candidate screening.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold">Upload Resumes</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily upload candidate resumes in bulk or integrate with your existing systems.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold">AI Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI analyzes each resume, matching skills and experience to your job requirements.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold">Get Results</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive a shortlist of top candidates, complete with AI-generated insights.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Clients Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">
                  &quot;ResumeAI has transformed our hiring process. We&apos;re saving hours on resume screening and finding
                  better candidates.&quot;
                </p>
                <p className="mt-4 font-bold">- Sarah J., HR Director</p>
              </div>
              <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">
                  &quot;The AI-powered insights have been invaluable in our decision-making process. Highly recommended!&quot;
                </p>
                <p className="mt-4 font-bold">- Mark T., Recruiter</p>
              </div>
              <div className="flex flex-col justify-between p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400">
                  &quot;We&apos;ve seen a 40% reduction in time-to-hire since implementing ResumeAI. It&apos;s a game-changer.&quot;
                </p>
                <p className="mt-4 font-bold">- Lisa R., CEO</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Hiring?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of companies using ResumeAI to find their best hires.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div>
        
      </div>
    </div>
  )
}
