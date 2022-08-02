import * as type from "../constants/explorerConstants";

const initialExplorerState = {
  loading: false,
  success: false,
  error: null,
  projects: null,
};

export const explorerReducer = (state = initialExplorerState, action) => {
  switch (action.type) {
    case type.PROJECTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case type.PROJECTS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.PROJECTS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case type.PROJECTS_RESET:
      return initialExplorerState;
    default:
      return state;
  }
};
