import { Avatar, Button, Dialog, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentAction,
  deletePostAction,
  likePost,
  myPostAction,
  updatePostAction,
  userPostAction,
} from "../../actions/Post";
import { getFollowingPost } from "../../actions/User";
import User from "../user/User";
import CommentBox from "../comment/CommentBox";

function Post({
  postId,
  ownerId,
  Like,
  comments,
  ownerImg,
  ownerName,
  title,
  image,
  isDelete = "false",
  isAccount = "false",
}) {
  const [likesUser, setLikesUser] = useState(false);
  const [commentUser, setCommentUser] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const [liked, setLiked] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [updateTitle, setUpdateTitle] = useState(title);

  const handleLiked = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount === "true") {
      dispatch(myPostAction());
    } else if (isAccount === "USERPOST") {
      dispatch(userPostAction(ownerId));
    } else {
      dispatch(getFollowingPost());
    }
  };

  useEffect(() => {
    Like.forEach((items) => {
      if (items._id === user._id) {
        setLiked(true);
      }
    });
  }, [user._id, Like]);
  const commentSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addCommentAction(postId, commentValue));
    setCommentValue("");
    if (isAccount === "true") {
      dispatch(myPostAction());
    } else if (isAccount === "USERPOST") {
      dispatch(userPostAction(ownerId));
    } else {
      dispatch(getFollowingPost());
    }
  };

  const updatePostHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePostAction(updateTitle, postId));
    dispatch(myPostAction());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePostAction(postId));
    dispatch(myPostAction());
  };

  return (
    <>
      {" "}
      <div className="md:w-[60%] w-[95%] flex flex-col shadow-md border border-slate-100 p-4 rounded-lg">
        <div className="flex justify-between">
          <Link to={`/user/${ownerId}`} className="flex gap-1 items-center ">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="SR"
                src={ownerImg ? ownerImg : ownerName}
                sx={{ bgcolor: deepPurple[500], width: 24, height: 24 }}
              />
            </Stack>
            <Typography>{ownerName}</Typography>
          </Link>
          {isAccount === "true" ? (
            <Button onClick={() => setUpdatePost(!updatePost)}>
              <MoreVertIcon />
            </Button>
          ) : null}
        </div>
        <div className="mt-2">
          <img
            src={image && image}
            alt={title}
            className=" rounded-xl w-[100%]"
          />
        </div>
        <div className="flex mt-1">
          <Button onClick={handleLiked}>
            {" "}
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
          <Button onClick={() => setCommentUser(!commentUser)}>
            {" "}
            <ChatBubbleOutlineIcon />
          </Button>
          {isDelete === "true" ? (
            <Button onClick={deletePostHandler}>
              {" "}
              <DeleteOutlined />
            </Button>
          ) : null}
        </div>
        <Button
          size="small"
          className="w-24"
          onClick={() => setLikesUser(!likesUser)}
          disabled={Like.length === 0 ? true : false}
        >
          {Like.length} likes
        </Button>
        <div className="max-h-8 overflow-y-auto">
          <h1 className="font-semibold">{title}</h1>
        </div>
      </div>
      <Dialog
        maxWidth="sm"
        open={likesUser}
        onClose={() => setLikesUser(!likesUser)}
      >
        <div className="w-96 h-[80vh] p-4 overflow-y-auto flex flex-col gap-2">
          <Typography variant="h4" className="text-slate-600">
            Liked by :
          </Typography>
          {Like &&
            Like.map((items) => {
              return (
                <User
                  key={items._id}
                  userId={items._id}
                  name={items.name}
                  avatar={items.avatar && items.avatar.url}
                />
              );
            })}
        </div>
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={commentUser}
        onClose={() => setCommentUser(!commentUser)}
      >
        <div className="w-96 h-[80vh] p-4 overflow-y-auto flex flex-col gap-2 overflow-x-hidden">
          <Typography variant="h4" className="text-slate-600">
            Comments :
          </Typography>

          <form onSubmit={commentSubmit}>
            <div className="shadow-md py-1 pl-2 rounded-l-lg flex border border-slate-100 pr-4">
              <input
                type="text"
                placeholder="comment here..."
                className=" flex-3 outline-none focus:ring-0"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <Button size="small" type="submit" variant="contained">
                Add
              </Button>
            </div>
          </form>
          {comments &&
            comments.map((items) => {
              return (
                <CommentBox
                  key={items._id}
                  userId={items.user._id}
                  name={items.user.name}
                  avatar={items.avatar && items.avatar.url}
                  comment={items.comment}
                  postId={postId}
                  commentId={items._id}
                  isAccount={isAccount}
                />
              );
            })}
        </div>
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={updatePost}
        onClose={() => setUpdatePost(!updatePost)}
      >
        <div className="w-96 h-[25vh] p-4 overflow-y-auto flex flex-col gap-2 overflow-x-hidden">
          <Typography variant="h4" className="text-slate-600 mb-4">
            Update Post :
          </Typography>

          <form onSubmit={updatePostHandler}>
            <div className="shadow-md py-1 pl-2 rounded-l-lg flex border border-slate-100 pr-4">
              <input
                type="text"
                placeholder="title..."
                className=" flex-3 outline-none focus:ring-0"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <Button size="small" type="submit" variant="contained">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default Post;
