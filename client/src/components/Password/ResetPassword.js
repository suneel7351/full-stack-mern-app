import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/User";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import Loader from "../Loader";
function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.Auth);
  const [password, setPassword] = useState("");
  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "ClearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearError" });
    }
  }, [dispatch, message, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div
            className="shadow-md border border-slate-100 rouded-lg p-4 w-11/12 md:w-1/2 mx-auto 
    mt-[18rem] md:mt-[14rem] py-8"
          >
            <h1 className="text-3xl text-slate-700 text-center mb-6">
              Set New Password
            </h1>
            <form onSubmit={handleResetPassword} className="mb-6">
              <div className="shadow-md py-1 pl-2 rounded-l-lg flex border border-slate-100 pr-4">
                <input
                  type="password"
                  placeholder="New Password..."
                  className=" flex-3 outline-none focus:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button size="small" type="submit" variant="contained">
                  New Password
                </Button>
              </div>
            </form>
            <Link
              to="/"
              className="text-slate-700 w-28 py-2 w-full text-center px-4 rounded-lg  border border-slate-100 shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
