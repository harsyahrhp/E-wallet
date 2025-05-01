import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput ({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={label}
        required
        className="w-full p-1 border-b border-purple-400 bg-transparent focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-0 top-2 text-purple-500"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;