import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../store/constants/resizerConstants';
const QualityControl = ({ quality }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Row className="mb-3 ">
        <Col xs={3} className="d-flex align-items-center">
          <Form.Label>Set Image Quality</Form.Label>
        </Col>
        <Col className="d-flex align-items-center">
          <Form.Control
            type="text"
            style={{ textAlign: 'center', width: '55px' }}
            value={quality}
            readOnly
          />
          <span className="mx-2">%</span>
        </Col>
      </Row>
      <input
        type="range"
        className="form-range"
        value={quality}
        onChange={(e) =>
          dispatch({ type: action.SET_IMAGE_QUALITY, payload: e.target.value })
        }
      />
    </>
  );
};

export default QualityControl;
