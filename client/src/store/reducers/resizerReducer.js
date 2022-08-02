import * as type from "../constants/resizerConstants";
import * as constant from "../../constants/home";

const initialResizerState = {
  loading: false,
  success: false,
  error: null,
  file: null,
  fileName: "",
  fileType: "",
  imageWidth: "",
  imageHeight: "",
  originalImageSize: 0,
  quality: constant.DEFAULT_IMG_QUALITY,
  projectId: null,
  imgData: null,
  uploading: false,
  uploaded: false,
  large: {
    width: constant.LARGE_IMG_WIDTH,
    height: constant.LARGE_IMG_WIDTH * (1 - constant.SCALE_WIDTH_FACTOR),
  },
  medium: {
    width: constant.MEDIUM_IMG_WIDTH,
    height: constant.MEDIUM_IMG_WIDTH * (1 - constant.SCALE_WIDTH_FACTOR),
  },
  thumbnail: {
    width: constant.THUMBNAIL_IMG_WIDTH,
    height: constant.THUMBNAIL_IMG_WIDTH * (1 - constant.SCALE_WIDTH_FACTOR),
  },
  //Create another slice
  customFormatError: null,
  customFormatLabel: "",
  customFormatWidth: "",
  customFormatHeight: "",
  customFormats: [],
};

export const resizerReducer = (state = initialResizerState, action) => {
  switch (action.type) {
    case type.IMG_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        uploading: true,
      };
    case type.IMG_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        imgData: action.payload,
        projectId: action.payload.projectId,
        uploaded: true,
      };
    case type.IMG_UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        uploading: false,
        uploaded: false,
      };
    case type.SET_IMG_FILE:
      const file = action.payload;
      return {
        ...state,
        file: file,
        fileName: file.name,
        fileType: file.type,
        originalImageSize: file.size / 1000,
      };
    case type.CUSTOM_FORMAT_ERROR:
      return {
        ...state,
        customFormatError: action.payload,
      };
    case type.CLEAR_CUSTOM_FORMAT_ERROR:
      return {
        ...state,
        customFormatError: null,
      };
    case type.SET_CUSTOM_FORMAT_WIDTH:
      return {
        ...state,
        customFormatWidth: action.payload,
      };
    case type.SET_CUSTOM_FORMAT_HEIGHT:
      return {
        ...state,
        customFormatHeight: action.payload,
      };
    case type.SET_CUSTOM_FORMAT_LABEL:
      return {
        ...state,
        customFormatLabel: action.payload,
      };
    case type.ADD_CUSTOM_FORMAT:
      return {
        ...state,
        customFormatWidth: "",
        customFormatHeight: "",
        customFormatLabel: "",
        customFormats: [...state.customFormats, action.payload],
      };
    case type.REMOVE_CUSTOM_FORMAT:
      return {
        ...state,
        customFormatWidth: "",
        customFormatHeight: "",
        customFormatLabel: "",
        customFormats: state.customFormats.filter(
          (customFormat) => customFormat.label !== action.payload
        ),
      };
    case type.SET_LARGE_WIDTH:
      return {
        ...state,
        large: {
          ...state.large,
          width: action.payload,
        },
      };
    case type.SET_MEDIUM_WIDTH:
      return {
        ...state,
        medium: {
          ...state.medium,
          width: action.payload,
        },
      };
    case type.SET_THUMBNAIL_WIDTH:
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          width: action.payload,
        },
      };
    case type.SET_LARGE_HEIGHT:
      return {
        ...state,
        large: {
          ...state.large,
          height: action.payload,
        },
      };
    case type.SET_MEDIUM_HEIGHT:
      return {
        ...state,
        medium: {
          ...state.medium,
          height: action.payload,
        },
      };
    case type.SET_THUMBNAIL_HEIGHT:
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          height: action.payload,
        },
      };
    case type.SET_IMAGE_SIZE:
      return {
        ...state,
        imageHeight: action.payload.height,
        imageWidth: action.payload.width,
      };
    case type.SET_IMAGE_QUALITY:
      return {
        ...state,
        quality: action.payload,
      };
    case type.RESIZER_CLEAR_STATE:
      return {
        ...state,
        file: null,
        quality: constant.DEFAULT_IMG_QUALITY,
        fileName: "",
        fileType: "",
        originalImageSize: 0,
      };
    case type.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case type.CLEAR_NOTIFICATION:
      return {
        ...state,
        success: false,
      };
    case type.RESIZER_RESET_STATE:
      return initialResizerState;
    default:
      return state;
  }
};
