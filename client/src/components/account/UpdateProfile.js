import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUser } from "../../actions/User";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, user, message } = useSelector((state) => state.Auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [avatar, setAvatar] = useState(user.avatar.url);
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
  const updateFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(name, email, avatar));
    dispatch(loadUser());
    navigate("/profile");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "  clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <>
      <div className="bg-slate-100 md:h-[90vh] h-[88vh] grid place-items-center w-full ">
        <div className="shadow-lg rounded-lg w-11/12 p-8 md:w-1/2 bg-white border border-slate-100">
          <h1 className="text-center pb-4 text-2xl text-slate-700 ">
            Register form
          </h1>
          <form className="flex flex-col gap-5" onSubmit={updateFormSubmit}>
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
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 shadow-md grid place-items-center border border-slate-100 rounded-lg"
            >
              {" "}
              {loading ? (
                <CircularProgress size={20} color="success" />
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
