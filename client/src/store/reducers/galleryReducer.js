import * as type from "../constants/galleryConstants";

const initialGalleryState = {
  loading: false,
  success: false,
  error: null,
  deleteing: false,
  deleted: false,
  projectId: null,
  message: "",
  images: [],
  downloadImgs: [],
  shouldRevalidate: false,
  notify: {
    notifyOne: false,
    notifyAll: false,
    withQueue: false,
  },
};

//Keep track of total numbers of projects availables and number of items per projects

export const galleryReducer = (state = initialGalleryState, action) => {
  switch (action.type) {
    case type.LAST_PROJECT_FETCH_REQUEST:
      if (state.deleteing) {
        return {
          ...state,
          loading: false,
        };
      }
      return {
        ...state,
        loading: true,
      };
    case type.SET_LAST_PROJECT_NOTIFICATION:
      return {
        ...state,
        notify: action.payload,
      };
    case type.LAST_PROJECT_FETCH_SUCCESS:
      const { images } = action.payload;
      return {
        ...state,
        success: true,
        loading: false,
        images: images,
        projectId: images[0] ? images[0].projectId : null,
      };
    case type.LAST_PROJECT_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case type.DOWNLOAD_IMG_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case type.DOWNLOAD_IMG_SUCCESS:
      return {
        ...state,
        downloadImgs: [...state.downloadImgs, action.payload],
      };
    case type.DOWNLOAD_IMG_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case type.LAST_PROJECT_DELETE_REQUEST:
      return {
        ...state,
        loading: false, //Do not show loading indicators while deleting
        deleteing: true,
      };
    case type.LAST_PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        deleteing: false,
        deleted: true,
        loading: false,
      };
    case type.LAST_PROJECT_DELETE_FAIL:
      return {
        ...state,
        deleteing: false,
        error: action.payload,
      };
    case type.LAST_PROJECT_RESET:
      if (state.deleteing) {
        return {
          ...state,
          loading: false,
          deleteing: true,
        };
      }
      return initialGalleryState;
    default:
      return state;
  }
};
