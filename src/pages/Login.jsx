import walledLogo from "../assets/react.svg";
import logo from "../assets/logo.svg";
import authBanner from "../assets/auth-picture.svg";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";
import { NavLink, useNavigate } from "react-router-dom";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  //   const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // login("123")

    console.log(JSON.stringify({
      username: username,
      password: password,
    }));

    try {
      const response = await fetch('http://localhost:8080/api/login', {
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
      console.log(data)

      if (response.ok) {
        alert(data.message);
        login(data.token);
          navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      // alert(data?.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden dark:text-white">
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

              <div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full mt-2 p-1 border-b border-purple-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <p className="mt-10 mb-2 text-center text-[12px] dark:text-gray-300">
                  Don’t have an account yet?{" "}
                  <NavLink to="/register" className="text-[#9F2BFB] underline">
                    Register
                  </NavLink>
                </p>
                <button
                  type="submit"
                  className="flex px-[2rem] py-[0.5rem] justify-self-center rounded-[4px] bg-[#9F2BFB] font-semibold text-white dark:text-black drop-shadow-xl hover:drop-shadow-none hover:shadow-inner"
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
