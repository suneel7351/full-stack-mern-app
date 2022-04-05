import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const likePostReducer = createReducer(initialState, {
  likePostRequest: (state) => {
    state.loading = true;
  },
  likePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likePostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  commentPostRequest: (state) => {
    state.loading = true;
  },
  commentPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deletecommentRequest: (state) => {
    state.loading = true;
  },
  deletecommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletecommentFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  createPostRequest: (state) => {
    state.loading = true;
  },
  createPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  createPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePostRequest: (state) => {
    state.loading = true;
  },
  updatePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});

export const myPostReducer = createReducer(initialState, {
  myPostRequest: (state) => {
    state.loading = true;
  },
  myPostSuccess: (state, action) => {
    state.loading = false;
    state.post = action.payload;
  },
  myPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
export const userPostReducer = createReducer(initialState, {
  userPostRequest: (state) => {
    state.loading = true;
  },
  userPostSuccess: (state, action) => {
    state.loading = false;
    state.post = action.payload;
  },
  userPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
