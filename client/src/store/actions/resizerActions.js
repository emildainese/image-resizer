import * as type from '../constants/resizerConstants';

export const uploadImage = (sizes, file, quality) => async (dispatch) => {
  dispatch({ type: type.RESIZER_RESET_STATE });

  const formData = new FormData();
  formData.append('sizes', JSON.stringify(sizes));
  formData.append('image', file);
  formData.append('quality', quality);

  dispatch({ type: type.IMG_UPLOAD_REQUEST });
  const res = await fetch(`/api/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (data.error || !res.ok) {
    return dispatch({
      type: type.IMG_UPLOAD_FAIL,
      payload: data.error || `${res.staus} - ${res.statusText}`,
    });
  }

  dispatch({ type: type.IMG_UPLOAD_SUCCESS, payload: data });
  dispatch({ type: type.RESIZER_CLEAR_STATE });
};

//-----------------------------------------------------------------
export const clearNotification = () => (dispatch) => {
  const timer = setTimeout(() => {
    dispatch({ type: type.CLEAR_NOTIFICATION });
    clearTimeout(timer);
  }, 5000);
};
