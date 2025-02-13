import { AiFillCrown, AiFillHome } from "react-icons/ai";
import { FaBriefcase, FaSignInAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";

import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

export default function NavBar() {
  const { authUser } = useAuthContext();
  const currentPage = useLocation();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-center items-center fixed w-full">
      <div className="m-2 flex sm:gap-6 gap-3 p-4 sm:px-10 sm:py-4 items-center bg-gray-100 h-fit w-fit rounded-full shadow-md sm:text-lg text-gray-500 cursor-pointer">
        <Link to={"/"}>
          <AiFillHome
            title="Home"
            className={`${
              currentPage.pathname === "/" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <Link to={"/jobs"}>
          <FaBriefcase
            title="jobs"
            className={`${
              currentPage.pathname === "/jobs" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        {authUser ? null : (
          <Link to={"/pricing"}>
            <AiFillCrown
              title="pricing"
              className={`${
                currentPage.pathname === "/pricing" ? "text-amber-500" : ""
              }`}
            />
          </Link>
        )}

        {authUser ? (
          <Link to={"/analytics"}>
            <IoAnalyticsSharp
              title="pricing"
              className={`${
                currentPage.pathname === "/analytics" ? "text-amber-500" : ""
              }`}
            />
          </Link>
        ) : null}

        <p>|</p>

        {authUser ? (
          <Link to={"/profile"}>
            <img
              title="profile"
              src={authUser.profileImage}
              alt="profile"
              className="h-5 w-5 rounded-full object-cover"
            />
          </Link>
        ) : null}

        {authUser ? (
          <MdLogout title="logout" onClick={handleLogout} />
        ) : (
          <Link to={"/log-in"}>
            <FaSignInAlt
              title="login"
              className={`${
                currentPage.pathname === "/log-in" ||
                currentPage.pathname === "/sign-up"
                  ? "text-amber-500"
                  : ""
              }`}
            />
          </Link>
        )}
      </div>
    </div>
  );
}
