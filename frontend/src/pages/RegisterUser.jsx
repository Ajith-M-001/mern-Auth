import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { useState } from "react";
import { useRegisterMutation } from "../app/slices/userApiSlice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleshowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleshowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmpassword) {
        toast.error("Password didn't match");
      } else {
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap();
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 6000);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-10 border shadow-sm  rounded-md p-5">
      <h1 className="text-2xl font-bold text-center my-3">
        create new account
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <FaRegUser className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full my-1 pl-10 px-4 py-2 rounded-md outline-none border focus-visible:border-gray-600"
            type="text"
            placeholder="Enter Your Name"
            onChange={handleChange}
            name="name"
            value={formData.name}
          />
        </div>
        <div className="relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 my-1 px-4 py-2 rounded-md outline-none border focus-visible:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>
        <div className="relative">
          {!showPassword ? (
            <FaRegEyeSlash
              onClick={handleshowPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          ) : (
            <FaRegEye
              onClick={handleshowPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          )}

          <input
            className="w-full my-1 pl-10 px-4 py-2 rounded-md outline-none border focus-visible:border-gray-600"
            type={!showPassword ? "password" : "text"}
            placeholder="Enter Password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>
        <div className="relative">
          {!showConfirmPassword ? (
            <FaRegEyeSlash
              onClick={handleshowConfirmPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          ) : (
            <FaRegEye
              onClick={handleshowConfirmPassword}
              className="absolute cursor-pointer text-lg top-1/2 -translate-y-1/2 left-3"
            />
          )}
          <input
            className="w-full pl-10 my-1 px-4 py-2 rounded-md outline-none border focus-visible:border-gray-600"
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="Confirm Password"
            onChange={handleChange}
            name="confirmpassword"
            value={formData.confirmpassword}
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md text-white hover:bg-gray-800 bg-gray-700 my-1 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? <BeatLoader color="#FFFFFF" size={10} /> : "Register"}
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          Alreay have an Account ?
          <Link
            to={"/login"}
            className="text-blue-600 ml-3 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
