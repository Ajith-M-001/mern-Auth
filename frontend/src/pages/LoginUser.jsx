import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../app/slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../app/slices/userSlice";
import { BeatLoader } from "react-spinners";

const LoginUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [loginUser, { isLoading }] = useLoginMutation();

  const handleshowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setCredentials(response));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-10 border shadow-sm  rounded-md p-5">
      <h1 className="text-2xl font-bold text-center my-3">welcome Back !!</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <TfiEmail className="absolute text-lg top-1/2 -translate-y-1/2 left-3" />
          <input
            className="w-full pl-10 my-1 px-4 py-2 rounded-md outline-none border focus-visible:border-gray-600"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            name="email"
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
          />
        </div>

        <button
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md text-white hover:bg-gray-800 bg-gray-700 my-1 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? <BeatLoader color="#FFFFFF" size={10} /> : "Login"}
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          New User ?
          <Link
            to={"/register"}
            className="text-blue-600 ml-3 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
