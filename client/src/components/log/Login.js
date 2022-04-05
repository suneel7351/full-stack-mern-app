import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./style.css";
function Login() {
  const { error, isAuthenticated } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    if (isAuthenticated) {
      toast.success("Logged in successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearError" });
    }
  }, [error, dispatch]);

  return (
    <>
      <div className="bg-slate-100 md:h-[90vh] h-[88vh] grid place-items-center w-full">
        <div className="shadow-lg rounded-lg w-11/12 md:w-1/2 p-8 bg-white border border-slate-100">
          <h1 className="text-center pb-4 text-2xl text-slate-700">
            Login form
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={loginFormSubmit}
          >
            <input
              type="email"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <input
              type="submit"
              value="Login"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg  border border-slate-100 cursor-pointer text-slate-700 text-slate-900"
            />

            <div className="flex flex-col gap-4">
              <Link
                to="/register"
                className="text-slate-700 w-28 py-2 w-full text-center px-4 rounded-lg  border border-slate-100 shadow-md"
              >
                New User
              </Link>
              <Link
                to="/password/forget"
                className="text-blue-700 w-full  ease-in duration-200  hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
