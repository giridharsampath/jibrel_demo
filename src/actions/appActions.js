import * as types from "./types";

export const changeText = () => (dispatch) => {
  dispatch({
    type: types.CHANGE_TEXT,
    payload: { msg: "Changed text successfully through Actions" },
  });
};
