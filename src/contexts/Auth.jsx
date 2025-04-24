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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({token});
    }
    setLoading(false);
  }, []);

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
    <AuthContext.Provider value={{ user, login, logout, loading, 
    changeStatus, statusRegis, changeStatusTransfer, statusTransfer, changeStatusTopup, statusTopup,
    accountnum, setAccountnum, pinRegistration, setPinRegistration, transferForm, setTransferForm,
    transferStatus, setTransferStatus}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
