import {
  PROJECTS_FETCH_FAIL,
  PROJECTS_FETCH_REQUEST,
  PROJECTS_FETCH_SUCCESS,
  PROJECTS_RESET,
} from '../constants/explorerConstants';

const initialExplorerState = {
  loading: false,
  success: false,
  error: null,
  projects: null,
};

export const explorerReducer = (state = initialExplorerState, action) => {
  switch (action.type) {
    case PROJECTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case PROJECTS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PROJECTS_RESET:
      return initialExplorerState;
    default:
      return state;
  }
};
