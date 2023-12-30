import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center my-2">
        Welcome to MERN-AUTH Project
      </h1>
      <p className="text-justify text-lg">
        MERN-Auth is a full-stack authentication project utilizing the MERN
        stack (MongoDB, Express.js, React, and Node.js), alongside Redux Toolkit
        for state management and React Router Dom for routing. The backend
        handles user data via RESTful APIs, enabling registration, login,
        logout, and profile management functionalities. Secure authentication is
        implemented through JSON Web Tokens. React components drive frontend
        tasks such as user registration, login, and profile management, while
        Firebase storage facilitates profile image uploads. Tailwind CSS
        enriches the frontend with visually appealing styles for an enhanced
        user experience
      </p>
      <div className="text-center mt-2 space-x-3">
        <Link
          to={"/login"}
          className="hover:bg-gray-600 bg-gray-500 px-4 py-2 rounded-sm text-white"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="hover:bg-gray-600 bg-gray-500 px-4 py-2 rounded-sm text-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Hero;
