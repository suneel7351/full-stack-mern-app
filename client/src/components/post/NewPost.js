import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../actions/Post";
import { toast } from "react-toastify";
function NewPost() {
  const { loading, message, error } = useSelector(
    (state) => state.likePostReducer
  );
  const dispatch = useDispatch();
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const createPost = (e) => {
    e.preventDefault();
    dispatch(createPostAction(title, image));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [message, error, dispatch]);

  return (
    <>
      <div className="w-11/12 md:w-1/2 shadow-md mx-auto border border-slate-100 mt-8 py-8">
        <Typography variant="h4" className="text-center">
          New Post
        </Typography>
        <form
          className="px-8 py-4 flex flex-col gap-4 form"
          onSubmit={createPost}
        >
          {image && (
            <img
              src={image}
              alt={title && title.substring(0, 6)}
              className="w-5/6 h-60 mx-auto object-contain"
            />
          )}
          <input
            type="file"
            accept="image/*"
            placeholder="Attach file"
            onChange={handleImageUpload}
          />
          <input
            type="text"
            placeholder="title..."
            className="px-2 text-slate-700 outline-none focus:ring-0 focus:outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />

          <button
            type="submit"
            className="cursor-pointer px-4 py-2 shadow-md grid place-items-center border border-slate-100 w-20 rounded-lg"
          >
            {" "}
            {loading ? <CircularProgress size={20} color="success" /> : "Post"}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPost;
