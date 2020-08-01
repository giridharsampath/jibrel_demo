import * as types from "../actions/types";
const initialState = {
  text: "Successfully setup redux. Hello from the reducer.",
};

export default function (state = initialState, action) {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    case types.CHANGE_TEXT:
      return {
        ...state,
        text: payload.msg,
      };
    default:
      return state;
  }
}
