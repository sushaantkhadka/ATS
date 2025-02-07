import {
  AiFillBell,
  AiFillCrown,
  AiFillHome,
  AiFillStar,
} from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function NavBar() {
  const {authUser} = useAuthContext();
  const currentPage = useLocation();
  

  return (
    <div className="flex justify-center items-center fixed w-full">
      <div className="m-2 flex sm:gap-6 gap-3 p-4 sm:px-10 sm:py-4 items-center bg-gray-100 h-fit w-fit rounded-full shadow-md sm:text-lg text-gray-500 cursor-pointer">
        <Link to={"/"}>
          <AiFillHome title="Home"
            className={`${
              currentPage.pathname === "/" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <Link to={"/feature"}>
          <AiFillStar
            className={`${
              currentPage.pathname === "/feature" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <Link to={"/notification"}>
          <AiFillBell
            className={`${
              currentPage.pathname === "/notification" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <Link to={"/pricing"}>
          <AiFillCrown
            className={`${
              currentPage.pathname === "/pricing" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <p>|</p>

        {authUser? (<Link to={"/profile"}>
          <img src={authUser.profileImage} alt="profile" className="h-5 w-5 rounded-full object-cover"/>
        </Link>) : null}

        <Link to={"/log-in"}>
          <FaSignInAlt
            className={`${
              currentPage.pathname === "/log-in" || currentPage.pathname === "/sign-up"
                ? "text-amber-500"
                : ""
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
