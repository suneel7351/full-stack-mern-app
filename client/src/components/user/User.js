import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
function User({ userId, name, avatar }) {
  return (
    <>
      <Link
        to={`/user/${userId}`}
        className="flex gap-3 items-center duration-200 ease hover:translate-y-[-2px]"
      >
        {name && avatar && (
          <>
            {" "}
            <Stack direction="row" spacing={2}>
              <Avatar
                alt={name.substring(0, 1)}
                src={avatar && avatar}
                sx={{ bgcolor: deepPurple[500] }}
              />
            </Stack>
            <Typography>{name}</Typography>
          </>
        )}
      </Link>
    </>
  );
}

export default User;
