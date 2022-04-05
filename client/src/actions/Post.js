import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likePostRequest" });
    const { data } = await axios.get(`/api/v1/memory/${id}`);
    dispatch({ type: "likePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "likePostFail" });
  }
};
export const addCommentAction = (id, comment) => async (dispatch) => {
  try {
    dispatch({ type: "commentPostRequest" });
    const { data } = await axios.put(
      `/api/v1/memory/comment/${id}`,
      { comment },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "commentPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "commentPostFail" });
  }
};
export const deleteCommentAction = (id, commentId) => async (dispatch) => {
  try {
    dispatch({ type: "deletecommentRequest" });
    const { data } = await axios.delete(`/api/v1/memory/comment/${id}`, {
      data: {
        commentId,
      },
    });
    dispatch({ type: "deletecommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deletecommentFail" });
  }
};
export const myPostAction = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostRequest" });
    const { data } = await axios.get(`/api/v1/my/posts`);
    dispatch({ type: "myPostSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "myPostFail" });
  }
};

export const createPostAction = (title, image) => async (dispatch) => {
  try {
    dispatch({ type: "createPostRequest" });
    const { data } = await axios.post(
      `/api/v1/memory/new`,
      { title, image },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "createPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "createPostFail" });
  }
};
export const updatePostAction = (title, id) => async (dispatch) => {
  try {
    dispatch({ type: "updatePostRequest" });
    const { data } = await axios.put(
      `/api/v1/update/memory/${id}`,
      { title },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "updatePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updatePostFail" });
  }
};
export const deletePostAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });
    const { data } = await axios.delete(`/api/v1/memory/${id}`);
    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deletePostFail" });
  }
};

export const userPostAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userPostRequest" });
    const { data } = await axios.get(`/api/v1/userpost/${id}`);
    dispatch({ type: "userPostSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "userPostFail" });
  }
};
export const userProfileAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getUserRequest" });
    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({ type: "getUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "getUserFail" });
  }
};
