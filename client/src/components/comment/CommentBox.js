import { Avatar, Typography, Stack } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Delete } from "@mui/icons-material";
import { deleteCommentAction, myPostAction } from "../../actions/Post";
import { getFollowingPost } from "../../actions/User";
function CommentBox({
  postId,
  userId,
  avatar,
  name,
  comment,
  commentId,
  isAccount,
}) {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentAction(postId, commentId));

    if (isAccount === "true") {
      dispatch(myPostAction());
    } else {
      dispatch(getFollowingPost());
    }
  };
  return (
    <>
      <div className="flex gap-3">
        <Link to={`/user/${userId}`} className="">
          <Stack direction="row" spacing={2}>
            <Avatar alt="SR" src={avatar} sx={{ bgcolor: deepPurple[500] }} />
          </Stack>
        </Link>

        <div className="">
          <div className="flex gap-40">
            {" "}
            <Link to={`/user/${userId}`} className="">
              <Typography className="font-bold">{name}</Typography>
            </Link>
            {isAccount === "true" ? (
              <Delete
                className="cursor-pointer"
                onClick={deleteCommentHandler}
              />
            ) : userId === user._id ? (
              <Delete
                className="cursor-pointer"
                onClick={deleteCommentHandler}
              />
            ) : null}
          </div>

          <Typography className="text-slate-700">{comment}</Typography>
        </div>
      </div>
    </>
  );
}

export default CommentBox;
