import * as type from "../constants/projectConstants";

const initialProjectState = {
  loading: false,
  success: false,
  error: null,
  projects: [],
  numProjects: 0,
  numImages: 0,
};

export const projectsReducer = (state = initialProjectState, action) => {
  switch (action.type) {
    case type.USER_PROJECTS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.USER_PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload.projects,
        numProjects: action.payload.numProjects,
        numImages: action.payload.numImages,
      };
    case type.USER_PROJECTS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.USER_PROJECTS_RESET:
      return initialProjectState;
    default:
      return state;
  }
};
