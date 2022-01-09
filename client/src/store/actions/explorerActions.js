import * as type from '../constants/explorerConstants';

//------------------------------------------------------------
export const fetchProjects = (target) => async (dispatch) => {
  dispatch({ type: type.PROJECTS_RESET });
  const targetDir = new URLSearchParams();
  targetDir.set('directory', target);
  dispatch({ type: type.PROJECTS_FETCH_REQUEST });
  const res = await fetch(`/api/dirtree?${targetDir}`);
  const data = await res.json();

  if (data.error || !res.ok) {
    return dispatch({
      type: type.PROJECTS_FETCH_FAIL,
      payload: data.error || `${res.status} - ${res.statusText}`,
    });
  }

  dispatch({ type: type.PROJECTS_FETCH_SUCCESS, payload: data });
};

//------------------------------------------------------------
export const deleteImage = () => (dispatch) => {};

//------------------------------------------------------------
export const editImage = () => (dispatch) => {};

//------------------------------------------------------------
export const downloadImage = () => (dispatch) => {};
