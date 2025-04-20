import { NavLink } from "react-router-dom";
// import { Sun } from "lucide-react";
import logo from "../assets/wally-logo.png";
import profile from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white dark:bg-black">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-[5rem] h-[2rem]" />
          {/* <span className="font-bold text-xl text-[#9F2BFB]">Wally.</span> */}
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#9F2BFB]"
                : "text-[#9F2BFB] hover:font-semibold"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transfer"
            className={({ isActive }) =>
                isActive
                  ? "font-semibold text-[#9F2BFB]"
                  : "text-[#9F2BFB] hover:font-semibold"
              }
          >
            Transfer
          </NavLink>
          <NavLink
            to="/topup"
            className={({ isActive }) =>
                isActive
                  ? "font-semibold text-[#9F2BFB]"
                  : "text-[#9F2BFB] hover:font-semibold"
              }
          >
            Topup
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          {/* <Sun className="text-[#9F2BFB]" size={20} /> */}
        </button>
        <div className="w-[1px] h-6 bg-gray-300"></div>
        <img
          src={profile}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
