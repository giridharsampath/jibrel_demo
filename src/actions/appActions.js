import * as types from "./types";

export const changeText = () => (dispatch) => {
  dispatch({
    type: types.CHANGE_TEXT,
    payload: { msg: "Changed text successfully through Actions" },
  });
};

export const addToList = (item) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_LIST,
    payload: { msg: "Changed text successfully through Actions", item },
  });
};

export const setStartAndEnd = (
  startingBlock,
  endingBlock,
  userAddress,
  erc20Address
) => (dispatch) => {
  dispatch({
    type: types.SET_START_AND_END,
    payload: {
      startingBlock,
      endingBlock,
      userAddress: `${userAddress}_${erc20Address}`,
    },
  });
};

export const setReceivedData = (
  startingBlock,
  endingBlock,
  userAddress,
  erc20Address,
  data
) => (dispatch) => {
  dispatch({
    type: types.SET_RECEIVED_DATA,
    payload: {
      startingBlock,
      endingBlock,
      userAddress: `${userAddress}_${erc20Address}`,
      data,
    },
  });
};
