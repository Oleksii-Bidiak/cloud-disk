import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fileReducer from "./fileReducer";
import uploadReducer from "./uploadReducer";
import userReducer from "./userReducer";
import appReduser from "./appReducer";

const rootReducer = combineReducers({
   user: userReducer,
   files: fileReducer,
   upload: uploadReducer,
   app: appReduser
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
