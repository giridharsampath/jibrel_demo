import * as types from "../actions/types";
const initialState = {
  text: "Successfully setup redux. Hello from the reducer.",
  count: 0,
  list: [],
  storedData: {},
};

export default function (state = initialState, action) {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    case types.SET_START_AND_END:
      return setStartAndEnd(payload, state);
    case types.SET_RECEIVED_DATA:
      return setReceivedData(payload, state);
    case types.SET_DATA_RETRIEVAL_COMPLETED:
      return setDataRetrievalFinished(payload, state);
    case types.RESET_ALL_DATA:
      return resetAllDataInAddress(payload, state);
    default:
      return state;
  }
}

const resetAllDataInAddress = (payload, state) => {
  const { storedData } = state;
  const { userAddress } = payload;
  storedData[userAddress] = {};

  return {
    ...state,
    storedData,
  };
};

const setDataRetrievalFinished = (payload, state) => {
  const { storedData } = state;
  const { userAddress } = payload;
  storedData[userAddress]["completed"] = true;
  return {
    ...state,
    storedData,
  };
};

const setStartAndEnd = (payload, state) => {
  const { startingBlock, endingBlock, userAddress, latestBlock } = payload;
  const { storedData } = state;
  if (!!!storedData[userAddress]) {
    storedData[userAddress] = { data: [] };
  }

  storedData[userAddress]["startingBlock"] = startingBlock;
  storedData[userAddress]["endingBlock"] = endingBlock;
  if (!!latestBlock) storedData[userAddress]["latestBlock"] = latestBlock;
  return {
    ...state,
    storedData,
  };
};

const setReceivedData = (payload, state) => {
  const { startingBlock, endingBlock, userAddress, data } = payload;
  const { storedData } = state;
  if (!!!storedData[userAddress]) {
    storedData[userAddress] = { data: [] };
  }
  if (!!!storedData[userAddress]["data"]) {
    storedData[userAddress]["data"] = [];
  }

  storedData[userAddress]["data"].push(...data);
  storedData[userAddress]["startingBlock"] = startingBlock;
  storedData[userAddress]["endingBlock"] = endingBlock;

  return {
    ...state,
    storedData,
  };
};
