const PasswordInput = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-6">
      {/* <label className="block text-sm mb-1">{label}</label> */}
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full p-1 border-b border-purple-400 bg-transparent focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-0 top-6 text-purple-500"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;