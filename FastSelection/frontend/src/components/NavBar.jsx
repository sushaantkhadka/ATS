import {
  AiFillBell,
  AiFillCrown,
  AiFillHome,
  AiFillStar,
} from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const currentPage = useLocation();

  return (
    <div className="flex justify-center items-center fixed w-full">
      <div className="m-2 flex gap-6 px-10 py-4 items-center bg-gray-100 h-fit w-fit rounded-full shadow-md text-lg text-gray-500 cursor-pointer">
        <Link to={"/"}>
          <AiFillHome
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

        <Link to={"/profile"}>
          <FaCircleUser
            className={`${
              currentPage.pathname === "/profile" ? "text-amber-500" : ""
            }`}
          />
        </Link>

        <Link to={"/sign-in"}>
          <FaSignInAlt
            className={`${
              currentPage.pathname === "/sign-in" && "/sign-up"
                ? "text-amber-500"
                : ""
            }`}
          />
        </Link>
      </div>
    </div>
  );
}
