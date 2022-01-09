import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../store/constants/resizerConstants';

const SizeControls = () => {
  const { large, medium, thumbnail, imageWidth, imageHeight } = useSelector(
    (state) => state.resizer
  );
  const dispatch = useDispatch();

  return (
    <>
      {imageWidth && imageHeight && (
        <Row className="mb-3">
          <Col xs={3}>
            <Form.Label>Original Size</Form.Label>
          </Col>
          <Col>
            <Form.Label>Original Width [px]</Form.Label>
            <Form.Control type="text" value={imageWidth} readOnly />
          </Col>
          <Col>
            <Form.Label>Original Height [px]</Form.Label>
            <Form.Control type="text" value={imageHeight} readOnly />
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col xs={3}>
          <Form.Label>Large Size</Form.Label>
        </Col>
        <Col>
          <Form.Label>Width [px]</Form.Label>
          <Form.Control
            type="number"
            value={large.width}
            onChange={(e) =>
              dispatch({
                type: action.SET_LARGE_WIDTH,
                payload: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Label>Height [px]</Form.Label>
          <Form.Control
            type="number"
            value={large.height}
            onChange={(e) =>
              dispatch({
                type: action.SET_LARGE_HEIGHT,
                payload: e.target.value,
              })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={3}>
          <Form.Label>Medium Size</Form.Label>
        </Col>
        <Col>
          <Form.Label>Width [px]</Form.Label>
          <Form.Control
            type="number"
            value={medium.width}
            onChange={(e) =>
              dispatch({
                type: action.SET_MEDIUM_WIDTH,
                payload: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Label>Height [px]</Form.Label>
          <Form.Control
            type="number"
            value={medium.height}
            onChange={(e) =>
              dispatch({
                type: action.SET_MEDIUM_HEIGHT,
                payload: e.target.value,
              })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={3}>
          <Form.Label>Thumbnail </Form.Label>
        </Col>
        <Col>
          <Form.Label>Width [px]</Form.Label>
          <Form.Control
            type="number"
            value={thumbnail.width}
            onChange={(e) =>
              dispatch({
                type: action.SET_THUMBNAIL_WIDTH,
                payload: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Label>Height [px]</Form.Label>
          <Form.Control
            type="number"
            value={thumbnail.height}
            onChange={(e) =>
              dispatch({
                type: action.SET_THUMBNAIL_HEIGHT,
                payload: e.target.value,
              })
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default SizeControls;
