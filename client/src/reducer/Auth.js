import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

export const UserReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  RegisterUserRequest: (state) => {
    state.loading = true;
  },
  RegisterUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  UpdateUserRequest: (state) => {
    state.loading = true;
  },
  UpdateUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.isAuthenticated = true;
  },
  UpdateUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  UpdatePasswordRequest: (state) => {
    state.loading = true;
  },
  UpdatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.message = action.payload;
    state.user = null;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  ClearMessage: (state) => {
    state.message = null;
  },
  ClearError: (state) => {
    state.error = null;
  },
});

export const postOfFollowingReducer = createReducer(
  {},
  {
    postRequest: (state) => {
      state.loading = true;
    },
    postSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    postFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ClearError: (state) => {
      state.error = null;
    },
  }
);
export const allUserReducer = createReducer(initialState, {
  allUserRequest: (state) => {
    state.loading = true;
  },
  allUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
export const getUserReducer = createReducer(initialState, {
  getUserRequest: (state) => {
    state.loading = true;
  },
  getUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  getUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
