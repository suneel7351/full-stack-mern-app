import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/User";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
function Register() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.Auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  const registerFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error]);

  return (
    <>
      <div className="bg-slate-100 md:h-[90vh] h-[88vh] grid place-items-center w-full ">
        <div className="shadow-lg rounded-lg w-11/12 p-8 md:w-1/2 bg-white border border-slate-100">
          <h1 className="text-center pb-4 text-2xl text-slate-700 ">
            Register form
          </h1>
          <form className="flex flex-col gap-5" onSubmit={registerFormSubmit}>
            <div className="flex gap-3 flex-col items-center">
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="SR"
                  src={avatar && avatar}
                  sx={{
                    bgcolor: deepPurple[500],
                    width: "150px",
                    height: "150px",
                  }}
                />
              </Stack>
              <input
                type="file"
                className="outline-none cursor-pointer focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
                placeholder="Avatar"
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>{" "}
            <input
              type="text"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 shadow-md grid place-items-center border border-slate-100 w-30 rounded-lg"
            >
              {" "}
              {loading ? (
                <CircularProgress size={20} color="success" />
              ) : (
                "Register"
              )}
            </button>
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-slate-700 w-24 text-center py-2 px-4 rounded-lg  border border-slate-100 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/password/forget"
                className="text-blue-700 ease-in duration-200  hover:text-blue-500"
              >
                Alredy have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
