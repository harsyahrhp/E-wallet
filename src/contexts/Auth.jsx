import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusRegis, setStatusRegis] = useState("RegisterForm");
  const [statusTransfer, setStatusTransfer] = useState("TransferForm");
  const [statusTopup, setStatusTopup] = useState("TopupForm");
  const [accountnum, setAccountnum] = useState(null);
  const [pinRegistration, setPinRegistration] = useState(null);
  const [transferForm, setTransferForm] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);
  const [topupForm, setTopupForm] = useState(null);
  const [topupStatus, setTopupStatus] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "true")
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode);
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const changeStatus = (param) => {
    setStatusRegis(param);
  };

  const changeStatusTransfer = (param) => {
    setStatusTransfer(param);
  };

  const changeStatusTopup = (param) => {
    setStatusTopup(param);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout, loading,
      changeStatus, statusRegis, changeStatusTransfer, statusTransfer, changeStatusTopup, statusTopup,
      accountnum, setAccountnum, pinRegistration, setPinRegistration, transferForm, setTransferForm,
      transferStatus, setTransferStatus, topupForm, setTopupForm, topupStatus, setTopupStatus, isDarkMode, setIsDarkMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
