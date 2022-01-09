import React, { useState, useLayoutEffect, useRef } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const { imgData, large, medium, thumbnail, imageWidth, imageHeight } =
    useSelector((state) => state.resizer);
  const [infoHeight, setInfoHeight] = useState();
  const infoRef = useRef(null);

  useLayoutEffect(() => {
    if (imgData && imgData.images && imgData.images.length > 0) {
      setInfoHeight(infoRef.current.clientHeight);
    }
  }, [imgData]);

  const setImage = (path, format) => {
    switch (format) {
      case 'original':
        return (
          <img
            src={path}
            className="img-fluid"
            alt="broken"
            width={imageWidth}
            height={imageHeight}
          />
        );
      case 'large':
        return (
          <img
            src={path}
            className="img-fluid"
            alt="broken"
            width={large.width}
            height={large.height}
          />
        );
      case 'medium':
        return (
          <img
            src={path}
            className="img-fluid"
            alt="broken"
            width={medium.width}
            height={medium.height}
          />
        );
      case 'thumbnail':
        return (
          <img
            src={path}
            className="img-fluid"
            alt="broken"
            width={thumbnail.width}
            height={thumbnail.height}
          />
        );
      default:
        return (
          <img
            src={path}
            className="img-fluid"
            alt="broken"
            width={imageWidth}
            height={imageHeight}
          />
        );
    }
  };

  let lastUploaded = null;
  if (imgData && imgData.images && imgData.images.length > 0) {
    lastUploaded = Object.entries(imgData.images[0])
      .slice(1)
      .map(([key, value], idx) => {
        return (
          <Col
            md={3}
            key={key}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            className="position-relative border border-primary"
          >
            {setImage(value.path, key)}
            <div
              ref={infoRef}
              className="position-absolute text-white lead w-100 p-3 d-flex justify-content-between"
              style={{
                top: `calc(100% - ${infoHeight}px)`,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <strong>Image format: </strong> <span>{key}</span>
              </div>
              <Button variant="primary">
                <i className="fas fa-download"></i>
              </Button>
            </div>
          </Col>
        );
      });
  }

  return (
    <>
      <Container className="mt-5">
        <h1 className="text-center text-primary">Image Gallery</h1>
        <Row>
          <Col md={6} className="offset-md-3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter Date</Form.Label>
                <Form.Control type="date" placeholder="Enter date" />
              </Form.Group>
              <Button className="w-100" variant="primary">
                Fetch Images
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {lastUploaded && (
        <Container fluid className="my-3 p-3">
          <h2 className="text-center text-primary my-3">
            Last Uploaded Images
          </h2>
          <Row className="g-0">{lastUploaded}</Row>
        </Container>
      )}
    </>
  );
};

export default Gallery;
