import logo from "../assets/logo.svg";
import authBanner from "../assets/auth-picture.svg";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/Auth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import PasswordInput from "../components/HidePassword.jsx";

const RegisterForm = () => {
  const { changeStatus, accountnum, setAccountnum } = useAuth();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password != confirmPassword){
      toast.error("Password Not Match");
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
          confirmationPassword: confirmPassword,
          phone: phoneNumber,
          fullName: fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setAccountnum(data.accountnum);
        changeStatus("RegisterPin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    // <div className="flex min-h-screen overflow-hidden dark:text-white">
    //   <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
    <div className="border-[1px] py-[2rem] px-[3rem] rounded-[40px] shadow-md">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Walled" src={logo} className="mx-auto h-10 w-auto" />
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center font-[600] text-[24px]">Register your account</p>
        <p className="text-center text-[12px]">Let’s get started!</p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                required
                placeholder="Full Name"
                className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Email"
                className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div>
            <div className="mt-2">
              <input
                id="phonenumber"
                name="phonenumber"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setPhoneNumber(value);
                  }
                }}
                value={phoneNumber}
                maxLength={12}
                type="text"
                placeholder="Phone Number"
                required
                className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <p className="mt-10 mb-2 text-center text-[12px] dark:text-gray-300">
              Already have an account?{" "}
              <NavLink to="/login" className="text-[#9F2BFB] underline">
                Login
              </NavLink>
            </p>
            <button
              type="submit"
              className="flex px-[2rem] py-[0.5rem] justify-self-center rounded-[4px] bg-[#9F2BFB] font-semibold text-white dark:text-black drop-shadow-xl hover:drop-shadow-none hover:shadow-inner"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
