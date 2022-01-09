import {
  RESIZER_RESET_STATE,
  RESIZER_CLEAR_STATE,
  IMG_UPLOAD_REQUEST,
  IMG_UPLOAD_SUCCESS,
  IMG_UPLOAD_FAIL,
  SET_LARGE_WIDTH,
  SET_LARGE_HEIGHT,
  SET_MEDIUM_HEIGHT,
  SET_MEDIUM_WIDTH,
  SET_THUMBNAIL_WIDTH,
  SET_THUMBNAIL_HEIGHT,
  SET_IMAGE_SIZE,
  CLEAR_ERROR,
  SET_IMAGE_QUALITY,
  SET_IMG_FILE,
  CLEAR_NOTIFICATION,
} from '../constants/resizerConstants';

import { DEFAULT_IMG_QUALITY } from '../../constants/home';

const SCALE_WIDTH_FACTOR = 0.25;
const LARGE_IMG_WIDTH = 800;
const MEDIUM_IMG_WIDTH = 400;
const THUMBNAIL_IMG_WIDTH = 400;

const initialResizerState = {
  loading: false,
  success: false,
  error: null,
  file: null,
  fileName: '',
  quality: DEFAULT_IMG_QUALITY,
  imgData: null,
  imageWidth: '',
  imageHeight: '',
  large: {
    width: LARGE_IMG_WIDTH,
    height: LARGE_IMG_WIDTH * (1 - SCALE_WIDTH_FACTOR),
  },
  medium: {
    width: MEDIUM_IMG_WIDTH,
    height: MEDIUM_IMG_WIDTH * (1 - SCALE_WIDTH_FACTOR),
  },
  thumbnail: {
    width: THUMBNAIL_IMG_WIDTH,
    height: THUMBNAIL_IMG_WIDTH * (1 - SCALE_WIDTH_FACTOR),
  },
};

export const resizerReducer = (state = initialResizerState, action) => {
  switch (action.type) {
    case IMG_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IMG_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        imgData: action.payload,
      };
    case IMG_UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case SET_IMG_FILE:
      return {
        ...state,
        file: action.payload.file,
        fileName: action.payload.fileName,
      };
    case SET_LARGE_WIDTH:
      return {
        ...state,
        large: {
          ...state.large,
          width: action.payload,
        },
      };
    case SET_MEDIUM_WIDTH:
      return {
        ...state,
        medium: {
          ...state.medium,
          width: action.payload,
        },
      };
    case SET_THUMBNAIL_WIDTH:
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          width: action.payload,
        },
      };

    case SET_LARGE_HEIGHT:
      return {
        ...state,
        large: {
          ...state.large,
          height: action.payload,
        },
      };
    case SET_MEDIUM_HEIGHT:
      return {
        ...state,
        medium: {
          ...state.medium,
          height: action.payload,
        },
      };
    case SET_THUMBNAIL_HEIGHT:
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          height: action.payload,
        },
      };
    case SET_IMAGE_SIZE:
      return {
        ...state,
        imageHeight: action.payload.height,
        imageWidth: action.payload.width,
      };
    case SET_IMAGE_QUALITY:
      return {
        ...state,
        quality: action.payload,
      };
    case RESIZER_CLEAR_STATE:
      return {
        ...state,
        file: null,
        quality: DEFAULT_IMG_QUALITY,
        fileName: '',
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        success: false,
      };
    case RESIZER_RESET_STATE:
      return initialResizerState;
    default:
      return state;
  }
};
