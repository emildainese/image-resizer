import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Col, Container, Row, Form, Spinner, Button } from 'react-bootstrap';
import UploadDetails from '../components/UploadDetails';
import Notification from '../components/Notification';
import ImagePreview from '../components/ImagePreview';
import FileInput from '../components/FileInput';
import SizeControls from '../components/SizeControls';
import QualityControl from '../components/QualityControl';
import FileInfo from '../components/FileInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotification,
  uploadImage,
} from '../store/actions/resizerActions';
import * as type from '../store/constants/resizerConstants';
import { setSizes } from '../util/sizes';

const Home = () => {
  const [previewHeight, setPreviewHeight] = useState();

  const controlsRef = useRef(null);

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
  }, [error, success, dispatch]);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch({
      type: type.SET_IMG_FILE,
      payload: {
        file: file,
        fileName: file.name,
      },
    });
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const sizes = setSizes(large, medium, thumbnail);
    dispatch(uploadImage(sizes, file, quality));
  };

  const dependency =
    controlsRef && controlsRef.current && controlsRef.current.clientHeight;
  useLayoutEffect(() => {
    if (controlsRef && controlsRef.current) {
      setPreviewHeight(controlsRef.current.clientHeight);
    }
  }, [dependency, file]);

  return (
    <Container className="mt-5 p-5" fluid>
      <h2 className="text-center mb-4 text-primary">
        Upload, Optimize and Resize your Image
      </h2>
      <Notification error={error} data={imgData} success={success} />
      <Row className="justify-content-center">
        {loading && (
          <div className="text-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
        <Col md={6} ref={controlsRef}>
          <Form className="p-3">
            <SizeControls />
            <Form.Group className="mb-3">
              <QualityControl quality={quality} />
            </Form.Group>
            <Form.Group>
              <FileInput
                fileUploadHandler={fileUploadHandler}
                fileChangeHandler={fileChangeHandler}
              />
              <Button variant="secondary" className="w-100 my-3">
                <i className="fas fa-image"></i> Add Image Format
              </Button>
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

      {imgData && <UploadDetails data={imgData} />}
    </Container>
  );
};

export default Home;
