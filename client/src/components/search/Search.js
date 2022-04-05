import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allUser } from "../../actions/User";
import Loader from "../Loader";
import User from "../user/User";

function Search() {
  const [userName, setUserName] = useState("");
  const { users, loading, error } = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(allUser(userName));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "ClearError" });
    }
  });

  return (
    <>
      <div className="">
        <div
          className="shadow-md border border-slate-100 rouded-lg p-8 w-11/12 md:w-1/2 mx-auto 
        mt-[2rem] md:mt-[1rem]"
        >
          <form onSubmit={handleSearch}>
            <div className="shadow-md py-1 pl-2 rounded-l-lg flex border border-slate-100 pr-4">
              <input
                type="text"
                placeholder="Search..."
                className=" flex-3 outline-none focus:ring-0"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button size="small" type="submit" variant="contained">
                Search
              </Button>
            </div>
          </form>

          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4 mt-8 py-6 overflow-y-auto h-[60vh]">
              {" "}
              {users && users.length > 0 ? (
                users.map((user) => {
                  return (
                    <User
                      userId={user._id}
                      name={user.name}
                      avatar={user.avatar.url}
                      key={user._id}
                    />
                  );
                })
              ) : (
                <Typography>No user yet...</Typography>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
