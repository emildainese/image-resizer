import { setHeaders } from "../../util/headers";
import * as type from "../constants/galleryConstants";
import { hasImg } from "../../util/validators";

//----------------------------------------------------------------------------
// Fetch project by a specific date
//----------------------------------------------------------------------------

export const fetchByDate = (year, month, fileName) => async (dispatch) => {
   if (!fileName || !year || !month) {
      return dispatch({
         type: type.LAST_PROJECT_FETCH_FAIL,
         payload: "File name and date is required fields.",
      });
   }

   const query = new URLSearchParams({ fileName, force: true });
   const headers = setHeaders();

   dispatch({ type: type.LAST_PROJECT_RESET });
   dispatch({ type: type.LAST_PROJECT_FETCH_REQUEST });
   const res = await fetch(`/api/images/${year}/${month}?${query}`, {
      method: "GET",
      headers,
   });
   const data = await res.json();

   if (!res.ok || data.error) {
      return dispatch({
         type: type.LAST_PROJECT_FETCH_FAIL,
         payload: data.error || `${res.status} - ${res.statusText}`,
      });
   }

   dispatch({ type: type.LAST_PROJECT_FETCH_SUCCESS, payload: data });
};

//----------------------------------------------------------------------------
// Fetch last uploaded images
//----------------------------------------------------------------------------

export const fetchLastProject = (projectId, force) => async (dispatch, getState) => {
   const { year: y, month: m } = setDate();
   let url = `/api/images/${y}/${m}`;

   const { images } = getState().gallery;

   let query = new URLSearchParams();
   if (hasImg(images)) {
      query.set("projectId", projectId);
      query.set("limit", images.length);
   }

   let headers = null;
   if (Boolean(force)) {
      query.set("force", force);
      headers = setHeaders();
      dispatch({ type: type.LAST_PROJECT_RESET });
   }

   url = `${url}?${query}`;
   dispatch({ type: type.LAST_PROJECT_FETCH_REQUEST });
   const res = await fetch(url, {
      method: "GET",
      ...(force && { headers }),
   });
   const data = await res.json();

   if (!res.ok || data.error) {
      return dispatch({
         type: type.LAST_PROJECT_FETCH_FAIL,
         payload: data.error || `${res.status} - ${res.statusText}`,
      });
   }

   dispatch({ type: type.LAST_PROJECT_FETCH_SUCCESS, payload: data });
};

//----------------------------------------------------------------------------
// Download a specific image from the server
//----------------------------------------------------------------------------
export const downloadImage = (path) => async (dispatch) => {
   const formatRe = /\/upload\/img\/\d{4}\/\d{2}\/(medium|large|thumbnail|original|[a-zA-Z1-9]+)\/.+\.(jpe?g|png)$/g;
   const imgPath = path.match(formatRe)[0];

   const paths = imgPath.split("/");
   const fileName = paths[paths.length - 1];

   dispatch({ type: type.DOWNLOAD_IMG_REQUEST });
   const res = await fetch(imgPath);
   const blob = await res.blob();

   if (!res.ok || !blob) {
      return dispatch({
         type: type.DOWNLOAD_IMG_FAIL,
         payload: `Could not download image ${fileName}, path:${imgPath}` || `${res.status} - ${res.statusText}`,
      });
   }

   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.download = fileName;
   link.href = url;
   document.body.appendChild(link);
   link.click();

   URL.revokeObjectURL(url);
   document.body.removeChild(link);

   dispatch({ type: type.DOWNLOAD_IMG_SUCCESS, payload: imgPath });
};
//----------------------------------------------------------------------------
// Delete an image by id or url
//----------------------------------------------------------------------------

export const deleteImage = (id, imgUrl) => async (dispatch, getState) => {
   let url = `/api/images/${id}`;

   const { notify } = getState().gallery;
   const { withQueue, notifyOne, notifyAll } = notify;

   const query = new URLSearchParams({
      imgUrl,
      withQueue,
      notifyOne,
      notifyAll,
   });

   if (imgUrl && !id) {
      url = `/api/images?${query}`;
   } else if (imgUrl && id) {
      url = `${url}?${query}`;
   }

   dispatch({ type: type.LAST_PROJECT_DELETE_REQUEST });
   const res = await fetch(url, { method: "DELETE" });
   const data = await res.json();

   if (!res.ok || data.error) {
      return dispatch({
         type: type.LAST_PROJECT_DELETE_FAIL,
         payload: `Could not delete image ${id}` || `${res.status} - ${res.statusText}`,
      });
   }

   dispatch({ type: type.LAST_PROJECT_DELETE_SUCCESS });
};

//----------------------------------------------------------------------------
// Set signals
//----------------------------------------------------------------------------

export const setNotification = (notification) => (dispatch) => {
   dispatch({ type: type.SET_LAST_PROJECT_NOTIFICATION, payload: notification });
};

//----------------------------------------------------------------------------
// Set the date to a default value
//----------------------------------------------------------------------------
const setDate = () => {
   const today = new Date();
   const year = today.getFullYear();
   let month = today.getMonth() + 1;
   if (month < 10) {
      month = "0" + month;
   }
   return {
      year,
      month,
   };
};
