import { Navigate } from "react-router";
import { useAuth } from "./contexts/Auth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:8080/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
          },
        });

        const data = await response.json();
        if(data.message == 'JWT token expired'){
          toast.error("Sesion Expired");
          navigate("/login");
        }
        // setDataUser(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const { user,loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
