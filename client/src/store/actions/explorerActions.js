import * as type from "../constants/explorerConstants";
import { setHeaders } from "../../util/headers";

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------
export const fetchProjects = (target, force) => async (dispatch) => {
  const query = new URLSearchParams();
  query.set("dir", target);

  let headers = null;
  if (Boolean(force)) {
    query.set("force", force);
    headers = setHeaders();
    dispatch({ type: type.PROJECTS_RESET });
  }

  dispatch({ type: type.PROJECTS_FETCH_REQUEST });
  const res = await fetch(`/api/dirtree?${query}`, {
    method: "GET",
    ...(force && { headers }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    return dispatch({
      type: type.PROJECTS_FETCH_FAIL,
      payload: data.error || `${res.status} - ${res.statusText}`,
    });
  }

  dispatch({ type: type.PROJECTS_FETCH_SUCCESS, payload: data });
};

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

export const deleteProject = () => async (dispatch) => {};

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

export const editProject = () => async (dispatch) => {};

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

export const downloadImage = () => async (dispatch) => {};
