import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RESET_APP_STATE } from "./constants/resizerConstants";
import { explorerReducer } from "./reducers/explorerReducer";
import { galleryReducer } from "./reducers/galleryReducer";
import { resizerReducer } from "./reducers/resizerReducer";
import { projectsReducer } from "./reducers/projectReducers";

const initialState = {};

const appReducers = combineReducers({
  resizer: resizerReducer,
  gallery: galleryReducer,
  projects: projectsReducer,
  explorer: explorerReducer,
});

const middleware = [thunk];

const rootReducer = (state, action) => {
  if (action.type === RESET_APP_STATE) {
    return appReducers(undefined, action);
  }
  return appReducers(state, action);
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
