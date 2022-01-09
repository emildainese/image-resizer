import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { explorerReducer } from './reducers/explorerReducer';
import { galleryReducer } from './reducers/galleryReducer';
import { resizerReducer } from './reducers/resizerReducer';

const initialState = {};

const reducers = combineReducers({
  resizer: resizerReducer,
  gallery: galleryReducer,
  explorer: explorerReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
