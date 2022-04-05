import React, { useEffect } from "react";
import User from "../user/User";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { allUser, getFollowingPost } from "../../actions/User";
import Loader from "../Loader";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
function Home() {
  const dispatch = useDispatch();
  const { message, error: likeError } = useSelector(
    (state) => state.likePostReducer
  );
  const { post, loading, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, laoding: userLoad } = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getFollowingPost());

    dispatch(allUser());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      toast.error(likeError, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: "ClearError" });
    }
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: "ClearError" });
    }
  }, [message, likeError, dispatch, error]);

  return (
    <>
      {loading === true || userLoad === true ? (
        <Loader />
      ) : (
        <div className="border-t border-slate-100">
          <div className="w-full md:w-10/12 mx-auto flex flex-col-reverse md:flex-row">
            {" "}
            <div className="left flex-none md:flex-3 py-8 border-r border-slate-100 flex flex-wrap justify-center gap-4 overflow-y-auto h-[80.3vh]">
              {post && post.length > 0 ? (
                post.map((items) => {
                  return (
                    <Post
                      key={items._id}
                      postId={items._id}
                      ownerId={items.owner._id}
                      Like={items.likes}
                      ownerName={items.owner.name}
                      title={items.title}
                      image={items.image && items.image.url}
                      comments={items.comments}
                    />
                  );
                })
              ) : (
                <Typography variant="h3" className="text-slate-600">
                  No post yet...
                </Typography>
              )}
            </div>
            <div className="right py-8 hidden md:block flex-none md:flex-1 overflow-y-auto">
              {" "}
              <div className="right flex-1  h-[80.3vh] flex gap-6 flex-col pl-6 flex-start">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
