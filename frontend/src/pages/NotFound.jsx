import images from "../components/Images";

const NotFound = () => {
  return (
    <div className="flex bg-gray-100 mb-10 items-center justify-center h-auto">
      <img
        src={images.customError}
        alt="Not Found"
        className="mt-8 rounded-lg shadow-md h-4/6 w-4/6"
      />
    </div>
  );
};

export default NotFound;
