import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../store/constants/resizerConstants";
import { setSizes } from "../util/sizes";
import { clearNotification, uploadImage } from "../store/actions/resizerActions";
import { Col, Container, Row, Form, Spinner, Button } from "react-bootstrap";
import UploadDetails from "../components/pages/resizer/UploadDetails";
import Notification from "../components/UI/Notification";
import ImagePreview from "../components/pages/resizer/ImagePreview";
import FileInput from "../components/pages/resizer/FileInput";
import SizeControls from "../components/pages/resizer/SizeControls";
import QualityControl from "../components/pages/resizer/QualityControl";
import FileInfo from "../components/pages/resizer/FileInfo";
import BaseModal from "../components/UI/BaseModal";
import CustomFormatModal from "../components/pages/resizer/CustomFormatModal";
import Title from "../components/UI/Title";

const Home = () => {
   const [previewHeight, setPreviewHeight] = useState();
   const [show, setShow] = useState(false);
   const controlsRef = useRef(null);
   const toggleModal = () => {
      setShow(!show);
   };

   const dispatch = useDispatch();

   const {
      large,
      medium,
      thumbnail,
      quality,
      imgData,
      error,
      loading,
      file,
      success,
      customFormatLabel,
      customFormatWidth,
      customFormatHeight,
   } = useSelector((state) => state.resizer);

   useEffect(() => {
      let timer = null;
      if (error) {
         timer = setTimeout(() => {
            dispatch({ type: type.CLEAR_ERROR });
         }, 5000);
      }
      if (success) {
         dispatch(clearNotification());
      }
      return () => clearTimeout(timer);
      // eslint-disable-next-line
   }, [error, success]);

   const dependency = controlsRef && controlsRef.current && controlsRef.current.clientHeight;
   useLayoutEffect(() => {
      if (controlsRef && controlsRef.current) {
         setPreviewHeight(controlsRef.current.clientHeight);
      }
   }, [dependency, file]);

   const fileChangeHandler = useCallback(
      (e) => {
         const file = e.target.files[0];
         if (!file) return;
         dispatch({
            type: type.SET_IMG_FILE,
            payload: file,
         });
      }, // eslint-disable-next-line
      [file]
   );

   const fileUploadHandler = useCallback(
      async (e) => {
         e.preventDefault();
         const sizes = setSizes(large, medium, thumbnail);
         dispatch(uploadImage(sizes, file, quality));
      },
      // eslint-disable-next-line
      [large, medium, thumbnail, quality, file]
   );

   const addFormatHandler = useCallback(() => {
      if (customFormatLabel.length > 0 && customFormatWidth.length > 0 && customFormatHeight.length > 0) {
         dispatch({
            type: type.ADD_CUSTOM_FORMAT,
            payload: {
               label: customFormatLabel,
               width: customFormatWidth,
               height: customFormatWidth,
            },
         });
         setShow(false);
      } else {
         dispatch({
            type: type.CUSTOM_FORMAT_ERROR,
            payload: "Error: Invalid format fields entered.",
         });
      }
      // eslint-disable-next-line
   }, [customFormatLabel, customFormatWidth, customFormatHeight]);

   const modalActions = (
      <Button variant="success" type="button" onClick={addFormatHandler}>
         Add Format
      </Button>
   );

   return (
      <>
         <BaseModal
            title="Add a custom image format"
            show={show}
            onClose={() => setShow(false)}
            actions={modalActions}
            size="lg"
            centered
         >
            <CustomFormatModal />
         </BaseModal>
         <Container className="mt-5" fluid>
            <Title title=" Upload, Optimize and Resize your Image" />
            <Container>
               <Row>
                  {loading && (
                     <div className="text-center">
                        <Spinner animation="grow" variant="primary" />
                     </div>
                  )}
                  <Col md={file ? 6 : 8} ref={controlsRef} className="mx-auto">
                     <Notification error={error} data={imgData} success={success} />
                     <Form className="p-3">
                        <Form.Group className="my-3">
                           <QualityControl quality={quality} />
                        </Form.Group>
                        <SizeControls />
                        <Form.Group>
                           <FileInput fileUploadHandler={fileUploadHandler} fileChangeHandler={fileChangeHandler} />
                        </Form.Group>
                        <Form.Group>
                           <Row className="p-0">
                              <Col>
                                 <Button variant="secondary" className="w-100 my-3" onClick={toggleModal}>
                                    <i className="fas fa-image"></i> Add Image Format
                                 </Button>
                              </Col>
                              {file && (
                                 <Col>
                                    <Button
                                       variant="danger"
                                       className="w-100 my-3"
                                       onClick={() => dispatch({ type: type.RESIZER_RESET_STATE })}
                                    >
                                       <i className="fas fa-trash"></i> Dismiss Image
                                    </Button>
                                 </Col>
                              )}
                           </Row>
                        </Form.Group>
                     </Form>
                  </Col>
                  {file && (
                     <Col md={6}>
                        <ImagePreview previewHeight={previewHeight * 0.75} />
                        <FileInfo previewHeight={previewHeight * 0.25} />
                     </Col>
                  )}
               </Row>
            </Container>
            {imgData && (
               <Row style={{ padding: "0 8rem" }}>
                  <Col>
                     <UploadDetails data={imgData} />
                  </Col>
               </Row>
            )}
         </Container>
      </>
   );
};

export default Home;
