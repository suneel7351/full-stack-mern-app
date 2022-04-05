import { configureStore } from "@reduxjs/toolkit";
import {
  allUserReducer,
  getUserReducer,
  postOfFollowingReducer,
  UserReducer,
} from "../reducer/Auth";
import {
  likePostReducer,
  myPostReducer,
  userPostReducer,
} from "../reducer/Post";

const store = configureStore({
  reducer: {
    Auth: UserReducer,
    postOfFollowing: postOfFollowingReducer,
    allUser: allUserReducer,
    likePostReducer: likePostReducer,
    myPost: myPostReducer,
    userPost: userPostReducer,
    userProfile: getUserReducer,
  },
});

export default store;
