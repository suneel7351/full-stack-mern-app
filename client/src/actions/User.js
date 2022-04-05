import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({ type: "postRequest" });
    const { data } = await axios.get(`/api/v1/memory`);

    dispatch({ type: "postSuccess", payload: data.memory });
  } catch (error) {
    dispatch({ type: "postFail", payload: error.response.data.message });
  }
};
export const allUser =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allUserRequest" });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      dispatch({ type: "allUserSuccess", payload: data.users });
    } catch (error) {
      dispatch({
        type: "allUserFail",
        payload: error.response.data.message,
      });
    }
  };
export const logOutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get(`/api/v1/logout`);
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterUserRequest",
      });

      const { data } = await axios.post(
        "/api/v1/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterUserFail",
        payload: error.response.data.message,
      });
    }
  };
export const updateUser = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "UpdateUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserFail",
      payload: error.response.data.message,
    });
  }
};
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UpdatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdatePasswordFail",
        payload: error.response.data.message,
      });
    }
  };
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/password/forgot",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.message,
    });
  }
};
export const resetPassword = (newPassword, token) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.message,
    });
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });
    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({ type: "followUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "followUserFail" });
  }
};
