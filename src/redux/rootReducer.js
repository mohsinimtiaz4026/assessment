import { combineReducers } from "redux";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import userReducer from "./slices/user";
import { createAction } from "@reduxjs/toolkit";

const clearStore = createAction('util/clearStore')
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();


const rootPersistConfig = {
    key:'root',
    storage,
    keyPrefix:'redux-',
    whitelist:[]
}

const userPersistConfig = {
    key:'user',
    storage,
    keyPrefix:'redux-',
    whitelist:[]
}

const appReducer = combineReducers({
    user: userReducer,
})

const rootReducer = (state, action) => {
    if(action.type == clearStore.type){
        storage.removeItem('persist:user')
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export {rootPersistConfig, rootReducer}