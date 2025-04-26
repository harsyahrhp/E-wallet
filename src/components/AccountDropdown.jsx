import { useNavigate } from "react-router-dom";

const AccountDropdown = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // hapus token
    navigate("/login"); // redirect ke login page
  };

  return (
    <div className="absolute right-0 mt-[5rem] w-40 bg-purple-700 text-white rounded-xl shadow-lg z-50 overflow-hidden">
      {/* <button
        className="w-full text-left px-4 py-2 hover:bg-purple-800"
        onClick={() => navigate("/profile")}
      >
        Profile
      </button> */}
      <button
        className="w-full text-left px-4 py-2 hover:bg-purple-800"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default AccountDropdown;
