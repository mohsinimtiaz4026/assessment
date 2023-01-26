import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { rootReducer } from "./rootReducer";
import { rootPersistConfig } from "./rootReducer";
import {
  useSelector as useAppSelector,
  useDispatch as useAppDispatch,
} from "react-redux";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

const { dispatch } = store;
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export {store, persistor, dispatch, useDispatch, useSelector};
