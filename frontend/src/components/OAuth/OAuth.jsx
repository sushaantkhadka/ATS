import { FaGoogle } from "react-icons/fa6";
import useOAuth from "../../hooks/useOAuth";

export default function OAuth() {
    const { oauth } = useOAuth();
    const handleGoogleAuth = () => {
        oauth()
    }

  return (
    <button type="button" onClick={handleGoogleAuth} className="my-2 text-white bg-red-600 hover:opacity-90 py-1 w-full rounded-lg flex justify-center items-center gap-2">
          <FaGoogle />
          Continue with Google
        </button>
  )
}
