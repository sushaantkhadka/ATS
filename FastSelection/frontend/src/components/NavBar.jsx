import { AiFillBell, AiFillCrown, AiFillHome, AiFillStar } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <div className="flex justify-center items-center fixed w-full">
        <div className="m-2 flex gap-6 px-10 py-4 items-center bg-gray-100 h-fit w-fit rounded-full shadow-md text-lg text-gray-500 cursor-pointer">
            <AiFillHome className="text-amber-500"/>
            <AiFillStar /> 
            <AiFillBell />
            <AiFillCrown />
            <p>|</p>
            <FaSignInAlt className="" />
        </div>
    </div>
  )
}
