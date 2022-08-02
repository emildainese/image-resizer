import { setHeaders } from "../../util/headers";
import * as type from "../constants/projectConstants";

//----------------------------------------------------------------------------
// fetchUserProjects
//----------------------------------------------------------------------------

export const fetchUserProjects = (force) => async (dispatch) => {
  let url = `/api/images/all`;
  let headers = null;

  if (Boolean(force)) {
    const query = new URLSearchParams({ force });
    url = `${url}?${query}`;
    headers = setHeaders();
    dispatch({ type: type.USER_PROJECTS_RESET });
  }

  dispatch({ type: type.USER_PROJECTS_FETCH_REQUEST });
  const res = await fetch(url, {
    method: "GET",
    ...(force && { headers }),
  });
  const data = await res.json();

  if (!res.ok || data.error) {
    dispatch({
      type: type.USER_PROJECTS_FETCH_FAIL,
      payload: data.error || `${res.status} - ${res.statusText}`,
    });
  }

  dispatch({ type: type.USER_PROJECTS_FETCH_SUCCESS, payload: data });
};
