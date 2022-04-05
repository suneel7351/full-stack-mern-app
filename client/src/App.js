import React, { useEffect } from "react";
import Appbar from "./components/Appbar/Appbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/log/Login";
import Register from "./components/register/Register";
import { loadUser } from "./actions/User";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/account/Profile";
import NewPost from "./components/post/NewPost";
import People from "./components/user/People";
import UpdateProfile from "./components/account/UpdateProfile";
import UpdatePassword from "./components/account/UpdatePassword";
import Search from "./components/search/Search";
import ForgotPassword from "./components/Password/ForgotPassword";
import ResetPassword from "./components/Password/ResetPassword";
import NotFound from "./components/notfound/NotFound";
function App() {
  const { isAuthenticated } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {isAuthenticated && <Appbar />}

        <Routes>
          {" "}
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path="/newpost"
            element={isAuthenticated ? <NewPost /> : <Login />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <People /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Profile /> : <Register />}
          />
          <Route
            path="/update/profile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="/reset/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Login />}
          />
          <Route
            path="/password/forget"
            element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
          />
          <Route
            path="/password/reset/:token"
            element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <People /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
