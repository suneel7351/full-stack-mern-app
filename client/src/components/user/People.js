import { Avatar, Button, Dialog, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPostAction, userProfileAction } from "../../actions/Post";
import Loader from "../Loader";
import Post from "../post/Post";
import { toast } from "react-toastify";
import { deepPurple } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import User from "../user/User";
import { followUser } from "../../actions/User";

function People() {
  const { id } = useParams();

  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followingOne, setFollowingOne] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const dispatch = useDispatch();
  const { user: myProfile } = useSelector((state) => state.Auth);
  const {
    user,
    error: userError,
    loading: userLoading,
  } = useSelector((state) => state.userProfile);
  const {
    post,
    error: postError,
    loading,
  } = useSelector((state) => state.userPost);
  const { message, error: followError } = useSelector(
    (state) => state.likePostReducer
  );

  const followHandler = async () => {
    setFollowingOne(!followingOne);
    await dispatch(followUser(user._id));
    dispatch(userProfileAction(id));
  };

  useEffect(() => {
    dispatch(userPostAction(id));
    dispatch(userProfileAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (myProfile._id === id) {
      setIsMyProfile(true);
    }
    if (user) {
      user.followers.forEach((element) => {
        if (element._id === myProfile._id) {
          setFollowingOne(true);
        } else {
          setFollowingOne(false);
        }
      });
    }
  }, [user, myProfile._id, id]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "ClearMessage" });
    }

    if (followError) {
      toast.error(followError);
      dispatch({ type: "ClearError" });
    }
    if (userError) {
      toast.error(userError);
      dispatch({ type: "ClearError" });
    }
    if (postError) {
      toast.error(postError);
      dispatch({ type: "ClearError" });
    }
  }, [message, followError, dispatch, postError, userError]);

  return (
    <>
      {loading === true || userLoading === true ? (
        <Loader />
      ) : (
        <div className="border-t border-slate-100">
          <div className="w-11/12 md:w-10/12 mx-auto flex py-8 flex-col-reverse md:flex-row flex-none md:flex-3">
            {" "}
            <div className="left flex-3 border-r border-slate-100 flex flex-wrap justify-center gap-4 overflow-y-auto h-[80.3vh]">
              {post && post.length > 0 ? (
                post.map((items) => {
                  return (
                    items && (
                      <Post
                        key={items._id}
                        postId={items._id}
                        ownerId={user._id}
                        Like={items.likes}
                        ownerName={user.name}
                        ownerImg={items.owner.avatar.url}
                        title={items.title}
                        description={items.description}
                        tag={items.tag}
                        comments={items.comments}
                        image={items.image && items.image.url}
                        isAccount="USERPOST"
                        isDelete="USERPOST"
                      />
                    )
                  );
                })
              ) : (
                <Typography variant="h4" className="text-slate-700">
                  No post yet...
                </Typography>
              )}
            </div>
            <div className="right flex-none md:flex-1 b-16 md:mb-0">
              {user && (
                <div className="right flex-1 overflow-y-auto h-[80.3vh] flex gap-6 flex-col pl-6">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="SR"
                        src={user.avatar.url && user.avatar.url}
                        sx={{ bgcolor: deepPurple[500], width: 80, height: 80 }}
                        className="hover:scale-110 ease duration-300"
                      />
                    </Stack>
                    <Typography>{user.name}</Typography>
                    <div className="flex gap-16 mt-8">
                      <div className="flex flex-col items-center">
                        <Typography variant="h6">
                          {user && user.followers.length}
                        </Typography>
                        <button
                          className="text-slate-700 hover:shadow-md px-4 py-2 rounded-lg"
                          onClick={() => setFollowers(!followers)}
                        >
                          Follwers
                        </button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Typography variant="h6">
                          {user && user.following.length}
                        </Typography>
                        <button
                          className="text-slate-700 hover:shadow-md px-4 py-2 rounded-lg"
                          onClick={() => setFollowing(!following)}
                        >
                          Following
                        </button>
                      </div>
                    </div>

                    {isMyProfile ? null : (
                      <Button
                        onClick={followHandler}
                        variant="contained"
                        className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 hover:text-slate-200 ease duration-300"
                      >
                        {followingOne ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Dialog
            maxWidth="sm"
            open={followers}
            onClose={() => setFollowers(!followers)}
          >
            <div className="w-96 h-[80vh] p-4 overflow-y-auto flex flex-col gap-2">
              <Typography variant="h4" className="text-slate-600">
                Followed by :
              </Typography>
              {user &&
                user.followers.map((items) => {
                  return (
                    <User
                      userId={items._id}
                      name={items.name}
                      avatar={items.avatar && items.avatar.url}
                      key={items._id}
                    />
                  );
                })}
            </div>
          </Dialog>
          <Dialog
            maxWidth="sm"
            open={following}
            onClose={() => setFollowing(!following)}
          >
            <div className="w-96 h-[80vh] p-4 overflow-y-auto flex flex-col gap-2">
              <Typography variant="h4" className="text-slate-600">
                Followings :
              </Typography>
              {user &&
                user.following.map((items) => {
                  return (
                    <User
                      userId={items._id}
                      name={items.name}
                      avatar={items.avatar && items.avatar.url}
                      key={items._id}
                    />
                  );
                })}
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default People;
