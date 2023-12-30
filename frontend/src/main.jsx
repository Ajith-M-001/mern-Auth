import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";
import LoginUser from "./pages/LoginUser.jsx";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import Profile from "./pages/Profile.jsx";
import Private from "./components/Private.jsx";
import NotFound from "./pages/NotFound.jsx";
import UpdateUser from "./pages/UpdateUser.jsx";

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Homepage />} />
      <Route path="register" element={<RegisterUser />} />
      <Route path="login" element={<LoginUser />} />
      <Route element={<Private />}>
        <Route path="profile" element={<Profile />} />
        <Route path="update" element={<UpdateUser />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
