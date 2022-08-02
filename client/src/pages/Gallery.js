import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
   fetchLastProject,
   fetchByDate,
   downloadImage,
   deleteImage,
   setNotification,
} from "../store/actions/galleryAction";
import * as type from "../store/constants/galleryConstants";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import ImageCard from "../components/pages/gallery/ImageCard";
import BaseModal from "../components/UI/BaseModal";
import Loader from "../components/UI/Loader";
import Notification from "../components/UI/Notification";
import Title from "../components/UI/Title";
import Switch from "../components/UI/Switch";

const imgStyle = {
   objectFit: "cover",
   width: "100%",
   height: "35vh",
};

const Gallery = () => {
   const [infoHeight, setInfoHeight] = useState();
   const [year, setYear] = useState();
   const [month, setMonth] = useState();
   const [name, setName] = useState("");

   const {
      imgData,
      large,
      medium,
      thumbnail,
      imageWidth,
      imageHeight,
      projectId: pid,
   } = useSelector((state) => state.resizer);

   const { images, error, loading, deleteing, projectId, notify } = useSelector((state) => state.gallery);

   const infoRef = useRef(null);

   const dispatch = useDispatch();

   const hasImageData = useCallback(() => imgData && imgData.images && imgData.images.length > 0, [imgData]);

   useEffect(() => {
      const projectID = setPid(projectId, pid);
      if (!hasImages(images) && !deleteing) {
         dispatch(fetchLastProject(projectID, true)); // 2a
      }
      // eslint-disable-next-line
   }, [projectId, pid]);

   useLayoutEffect(() => {
      if (hasImages()) {
         setInfoHeight(infoRef.current.clientHeight);
      }
   }, []);

   const dateChangeHandler = (e) => {
      const d = e.target.value.split("-");
      setYear(d[0]);
      setMonth(d[1]);
   };

   const fileNameChangeHandler = useCallback((e) => {
      setName(e.target.value.trim().replace(/[^A-Za-z1-9-]/g, ""));
   }, []);

   const deleteImageHandler = useCallback(
      (id, path) => {
         if (!projectId) {
            dispatch(deleteImage(null, path));
            dispatch(fetchLastProject(null, true)); // 1a
         } else {
            dispatch(deleteImage(id, path));
            dispatch(fetchLastProject(projectId, true)); // 1a
         }
      },
      // eslint-disable-next-line
      [projectId]
   );

   const downloadImageHandler = useCallback((path) => {
      dispatch(downloadImage(path));
      // eslint-disable-next-line
   }, []);

   const switchChangeHandler = useCallback(
      (e) => {
         dispatch(setNotification({ ...notify, [e.target.name]: e.target.checked }));
      },
      // eslint-disable-next-line
      [notify]
   );

   if (loading) {
      return <Loader style={{ marginTop: "5rem" }} />;
   }

   if (error && !loading) {
      return <BaseModal error={error} show={!!error} onClose={() => dispatch({ type: type.LAST_PROJECT_RESET })} />;
   }

   //Set images format
   const setImage = (path, format) => {
      switch (format) {
         case "original":
            return (
               <img
                  src={path}
                  className="img-fluid"
                  alt="NotAvailable"
                  style={imgStyle}
                  width={imageWidth}
                  height={imageHeight}
               />
            );
         case "large":
            return (
               <img
                  src={path}
                  className="img-fluid"
                  alt="NotAvailable"
                  style={imgStyle}
                  width={large.width}
                  height={large.height}
               />
            );
         case "medium":
            return (
               <img
                  src={path}
                  className="img-fluid"
                  alt="NotAvailable"
                  style={imgStyle}
                  width={medium.width}
                  height={medium.height}
               />
            );
         case "thumbnail":
            return (
               <img
                  src={path}
                  className="img-fluid"
                  alt="NotAvailable"
                  style={imgStyle}
                  width={thumbnail.width}
                  height={thumbnail.height}
               />
            );
         default:
            return (
               <img
                  src={path}
                  className="img-fluid"
                  alt="NotAvailable"
                  width={imageWidth}
                  height={imageHeight}
                  style={imgStyle}
               />
            );
      }
   };

   let lastUploaded = null;
   if (hasImageData()) {
      lastUploaded = Object.entries(imgData.images[0])
         .slice(1)
         .map(([key, value], idx) => (
            <ImageCard
               key={idx}
               path={value.path}
               format={key}
               infoHeight={infoHeight}
               infoRef={infoRef}
               downloadImageHandler={downloadImageHandler}
               deleteImageHandler={deleteImageHandler}
               setImage={setImage}
            />
         ));
   } else if (images && images.length > 0) {
      lastUploaded = images.map((image, idx) => (
         <ImageCard
            key={idx}
            path={image.url}
            format={image.format}
            id={image.id}
            infoHeight={infoHeight}
            infoRef={infoRef}
            downloadImageHandler={downloadImageHandler}
            deleteImageHandler={deleteImageHandler}
            setImage={setImage}
         />
      ));
   }

   return (
      <>
         <Container className="mt-5">
            <Title title="Find Your Images" />
            <Row>
               <Col md={8} className="mx-auto">
                  <Form>
                     <Form.Group className="mb-3">
                        <Form.Label>Project Date</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" onChange={dateChangeHandler} />
                     </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label>File Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter file name" onChange={fileNameChangeHandler} />
                     </Form.Group>
                     <Row>
                        <Col>
                           <Button
                              variant="primary"
                              className="w-100"
                              onClick={() => {
                                 if (!year || !month || !name) return;
                                 dispatch(fetchByDate(year, month, name));
                              }}
                           >
                              <i className="fas fa-database me-2"></i> Fetch Images
                           </Button>
                        </Col>
                        <Col>
                           <Button
                              className="w-100"
                              variant="secondary"
                              onClick={() => {
                                 dispatch(fetchLastProject(projectId, true));
                              }}
                           >
                              <i className="fas fa-sync me-2"></i> Force Refresh
                           </Button>
                        </Col>
                     </Row>
                  </Form>
               </Col>
            </Row>
         </Container>
         <Container className="mt-3">
            <Row>
               <Col md={8} className="mx-auto">
                  <Form>
                     <Row>
                        <Col>
                           <Form.Group>
                              <Switch label="Notify project deletion" name="notifyOne" onChange={switchChangeHandler} />
                           </Form.Group>
                        </Col>
                        <Col>
                           <Form.Group>
                              <Switch
                                 label="Notify all project deletion"
                                 name="notifyAll"
                                 onChange={switchChangeHandler}
                              />
                           </Form.Group>
                        </Col>
                        <Col>
                           <Form.Group>
                              <Switch label="With queue" name="withQueue" onChange={switchChangeHandler} />
                           </Form.Group>
                        </Col>
                     </Row>
                  </Form>
               </Col>
            </Row>
         </Container>
         {lastUploaded ? (
            <Container fluid className="my-3 p-3">
               <Title title="Last Uploaded Images" />
               <div className="text-center">
                  <Button variant="success" className="mb-3">
                     Responsive Images
                  </Button>
               </div>
               <Row className="g-2">{lastUploaded}</Row>
            </Container>
         ) : (
            !deleteing &&
            !loading &&
            !error &&
            !hasImages(images) && (
               <Container className="mt-5">
                  <Title title="Your Last Projects" />
                  <Row className="mt-5">
                     <Col md={8} className="mx-auto">
                        <Notification error="No projects available, please upload some photos!" />
                        <Link className="btn btn-primary" to="/">
                           Go to Upload
                        </Link>
                     </Col>
                  </Row>
               </Container>
            )
         )}
      </>
   );
};

export default Gallery;

//NO! Use general validators
const hasImages = (images) => images && images.length > 0;

//NO! Use general validators
const setPid = (projectId, pid) =>
   projectId &&
   projectId !== null &&
   projectId !== "null" &&
   projectId !== "undefined" &&
   projectId !== undefined &&
   projectId !== ""
      ? projectId
      : pid && pid !== null && pid !== "null" && pid !== undefined && pid !== "undefined" && pid !== ""
      ? pid
      : null;
