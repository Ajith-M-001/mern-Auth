import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteMutation,
  useLogoutMutation,
} from "../app/slices/userApiSlice";
import { clearCredentials } from "../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [logoutUser] = useLogoutMutation();
  const [deleteUser] = useDeleteMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (error) {
      console.log(`failed to Logout User`);
    }
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are You Sure You Want To Delete Your Account ?"
      );

      if (confirm) {
        await deleteUser();
        dispatch(clearCredentials());
        navigate("/login");
      }
    } catch (error) {
      console.log(`failed to delete User`);
    }
  };
  return (
    <>
      <div className="text-green-700 mt-4  text-3xl text-center font-bold">
        <p>This is Private Route means - This is Protected Route</p>
        <p>You are seeing This Page Becuase You have Logged In</p>
        <p>If You are not logged In, You can not see this Page</p>
      </div>
      <div className="max-w-sm mx-auto border mt-10">
        <h1 className="p-3 text-center font-semibold text-xl bg-gray-300 border rounded-sm">
          User Profile
        </h1>
        <div className="p-5 border text-center text-xl space-y-3 ">
          <img
            className="h-fit w-fit object-cover "
            src={userInfo.image}
            alt="profile pic"
          />
          <p>
            Name : <strong>{userInfo.name}</strong>
          </p>
          <p>
            Email : <strong>{userInfo.email}</strong>
          </p>
        </div>
        <div className="p-4 border mb-10 flex justify-between items-center text-xl text-red-600">
          <Link to={"/update"}>
            <p className="hover:underline cursor-pointer">Update</p>
          </Link>
          <p onClick={handleDelete} className="hover:underline cursor-pointer">
            Delete
          </p>
          <p onClick={handleLogout} className="hover:underline cursor-pointer">
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
