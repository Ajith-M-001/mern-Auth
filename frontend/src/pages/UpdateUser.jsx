import { useNavigate } from "react-router-dom";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { useUpdateMutation } from "../app/slices/userApiSlice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../app/slices/userSlice";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import app from "../firebase";

const UpdateUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  const [progresspercent, setProgresspercent] = useState(0);
  const [updateUser, { isLoading }] = useUpdateMutation();
  const [image, setImage] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
    setFormData(userInfo);
  }, [userInfo, image]);

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

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
        const response = await updateUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: formData.image,
        }).unwrap();
        dispatch(setCredentials(response));
        toast.success("user Updated Successfully");
        navigate("/profile");
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
      <h1 className="text-2xl font-bold text-center my-3">Update</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3 justify-center items-center my-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            ref={imageRef}
            hidden
          />
          <img
            className="h-20 w-20 object-cover rounded-full cursor-pointer"
            src={formData.image || userInfo.image}
            alt="profile pic"
            onClick={() => imageRef.current.click()}
          />
          <p>
            {progresspercent > 0 && progresspercent < 100 ? (
              <span className="text-gray-600">{` Uploading ${progresspercent} %`}</span>
            ) : progresspercent === 100 ? (
              <span className="text-green-600">
                Image Uploaded Successfully
              </span>
            ) : (
              " "
            )}
          </p>
        </div>
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
          />
        </div>
        <button
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md text-white hover:bg-gray-800 bg-gray-700 my-1 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? <BeatLoader color="#FFFFFF" size={10} /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
