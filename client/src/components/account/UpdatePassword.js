import React, { useEffect, useState } from "react";

import { updatePassword } from "../../actions/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

function UpdatePassword() {
  const { error, loading, message } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  return (
    <>
      <div className="bg-slate-100 md:h-[90vh] h-[88vh] grid place-items-center w-full">
        <div className="shadow-lg rounded-lg w-11/12 md:w-1/2 p-8 bg-white border border-slate-100">
          <h1 className="text-center pb-4 text-2xl text-slate-700">
            Update Password
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={updatePasswordHandler}
          >
            <input
              type="password"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Old Password..."
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              required
            />
            <input
              type="password"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="New Password..."
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
            <input
              type="password"
              className="outline-none focus:ring-0 shadow-md py-2 px-2 rounded-lg border border-slate-100"
              placeholder="Confirm Password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
