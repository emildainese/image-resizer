import { setHeaders } from "../../util/headers";
import * as type from "../constants/resizerConstants";

//----------------------------------------------------------------------------
// uploadImage
//----------------------------------------------------------------------------

export const uploadImage =
  (sizes, file, quality) => async (dispatch, getState) => {
    const { imageWidth, imageHeight, customFormats, originalImageSize } =
      getState().resizer;

    let updatedSizes = sizes.slice();
    if (imageWidth && imageHeight) {
      updatedSizes = sizes.concat({
        path: "original",
        width: imageWidth,
        height: imageHeight,
      });
    }

    if (customFormats.length > 0) {
      const custom = customFormats.map((format) => {
        return {
          path: format.label.toLowerCase(), // for SharpResizer
          width: +format.width,
          height: +format.height,
        };
      });
      updatedSizes = updatedSizes.concat(custom);
    }

    const formData = new FormData();
    formData.append("sizes", JSON.stringify(updatedSizes));
    formData.append("image", file);
    formData.append("quality", quality);
    formData.append("originalImageSize", originalImageSize);
    const query = new URLSearchParams({ force: true });
    const headers = setHeaders();

    //Reset App state
    dispatch({ type: type.RESET_APP_STATE });
    dispatch({ type: type.IMG_UPLOAD_REQUEST });
    const res = await fetch(`/api/upload?${query}`, {
      method: "POST",
      headers,
      body: formData,
    });
    const data = await res.json();

    if (!res.ok || data.error) {
      return dispatch({
        type: type.IMG_UPLOAD_FAIL,
        payload: data.error || `${res.staus} - ${res.statusText}`,
      });
    }

    dispatch({ type: type.IMG_UPLOAD_SUCCESS, payload: data });
    dispatch({ type: type.RESIZER_CLEAR_STATE });
  };

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

export const clearNotification = () => (dispatch) => {
  const timer = setTimeout(() => {
    dispatch({ type: type.CLEAR_NOTIFICATION });
    clearTimeout(timer);
  }, 3000);
};

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------
export const lcfirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);

export const replaceUpper = (str) =>
  str.replace(/([A-Z]+)/g, (...matches) =>
    matches.map((char) => char.toLowerCase())
  );
