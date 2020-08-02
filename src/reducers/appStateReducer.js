import * as types from "../actions/types";
const initialState = {
  text: "Successfully setup redux. Hello from the reducer.",
  count: 0,
  list: [],
  storedData: {},
  datatable: {},
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
    case types.ADD_TO_LIST:
      const { list } = state;
      list.push(payload.item);
      return {
        ...state,
      };
    case types.SET_START_AND_END:
      return setStartAndEnd(payload);
    case types.SET_RECEIVED_DATA:
      return setReceivedData(payload);
    default:
      return state;
  }
}

const setStartAndEnd = (payload, state = initialState) => {
  const { startingBlock, endingBlock, userAddress } = payload;
  const { storedData } = state;
  if (!!!storedData[userAddress]) storedData[userAddress] = {};
  if (!!!storedData[userAddress]["data"]) storedData[userAddress]["data"] = [];
  storedData[userAddress]["startingBlock"] = startingBlock;
  storedData[userAddress]["endingBlock"] = endingBlock;
  return {
    ...state,
    storedData,
  };
};

const setReceivedData = (payload, state = initialState) => {
  const { startingBlock, endingBlock, userAddress, data } = payload;
  const { storedData, datatable } = state;
  if (!!!storedData[userAddress]) storedData[userAddress] = {};
  if (!!!storedData[userAddress]["data"]) storedData[userAddress]["data"] = [];
  storedData[userAddress]["data"].push(...data);
  storedData[userAddress]["startingBlock"] = startingBlock;
  storedData[userAddress]["endingBlock"] = endingBlock;
  if (!!!datatable[userAddress])
    datatable[userAddress] = {
      columns: [
        {
          label: "Address",
          field: "address",
        },
        {
          label: "Block Hash",
          field: "blockhash",
        },
        {
          label: "Block Number",
          field: "blocknumber",
        },
      ],
      rows: [],
    };
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    datatable[userAddress].rows.push({
      address: row["address"],
      blockhash: row["blockHash"],
      blocknumber: row["blockNumber"],
    });
  }

  return {
    ...state,
    storedData,
    datatable,
  };
};
