import walledLogo from "../assets/react.svg";
import logo from "../assets/logo.svg";
import authBanner from "../assets/auth-picture.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../components/HidePassword.jsx"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, changeStatus } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://kelompok5.serverku.org/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        login(data.token);
          navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(()=>{
    changeStatus("RegisterForm")
  })

  return (
    <div className="flex min-h-screen overflow-hidden ">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="border-[1px] p-[2rem] rounded-[40px] shadow-md">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Walled" src={logo} className="mx-auto h-10 w-auto" />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="text-center font-[600] text-[24px]">Welcome Back</p>
            <p className="text-center text-[12px]">Enter your email and password to access your account!</p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
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

                <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <div>
                <p className="mt-10 mb-2 text-center text-[12px] ">
                  Don’t have an account yet?{" "}
                  <NavLink to="/register" className="text-[#9F2BFB] underline">
                    Register
                  </NavLink>
                </p>
                <button
                  type="submit"
                  className="flex px-[2rem] py-[0.5rem] justify-self-center rounded-[4px] bg-[#9F2BFB] font-semibold text-white drop-shadow-xl hover:drop-shadow-none hover:shadow-inner"
                >
                  Login
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img className="h-full object-cover" src={authBanner} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
