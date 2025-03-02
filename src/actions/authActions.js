import { persistor } from "../store";

export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("authToken");
    persistor.purge(); 

    dispatch({
      type: LOGOUT,
    });
  };
};
