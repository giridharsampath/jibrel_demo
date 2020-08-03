import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const initialState = {};
const persistConfig = {
  key: "1",
  storage: storageSession,
  stateReconciler: autoMergeLevel1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let persistor = persistStore(store);

export default { store, persistor };
