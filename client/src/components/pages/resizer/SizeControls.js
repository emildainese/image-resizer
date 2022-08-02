import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as type from "../../../store/constants/resizerConstants";

// debounce inputs or use refs
const SizeControls = () => {
   const { large, medium, thumbnail, imageWidth, imageHeight, customFormats } = useSelector((state) => state.resizer);

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
               <Form.Label className="d-sm-flex">
                  Large <span className="d-none d-sm-block mx-sm-1">Size</span>
               </Form.Label>
            </Col>
            <Col>
               <Form.Label>Width [px]</Form.Label>
               <Form.Control
                  type="number"
                  value={large.width}
                  onChange={(e) =>
                     dispatch({
                        type: type.SET_LARGE_WIDTH,
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
                        type: type.SET_LARGE_HEIGHT,
                        payload: e.target.value,
                     })
                  }
               />
            </Col>
         </Row>
         <Row className="mb-3">
            <Col xs={3}>
               <Form.Label className="d-sm-flex">
                  Medium <span className="d-none d-sm-block mx-sm-1">Size</span>
               </Form.Label>
            </Col>
            <Col>
               <Form.Label>Width [px]</Form.Label>
               <Form.Control
                  type="number"
                  value={medium.width}
                  onChange={(e) =>
                     dispatch({
                        type: type.SET_MEDIUM_WIDTH,
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
                        type: type.SET_MEDIUM_HEIGHT,
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
                        type: type.SET_THUMBNAIL_WIDTH,
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
                        type: type.SET_THUMBNAIL_HEIGHT,
                        payload: e.target.value,
                     })
                  }
               />
            </Col>
         </Row>
         {customFormats && customFormats.length > 0 && (
            <Row className="mb-5">
               <h3 className="text-primar text-center text-gradient display-5 mb-3 p-3">Your custom format images</h3>
               {customFormats.map(({ width, height, label }) => (
                  <Row className="mb-3" key={label}>
                     <CustomFormat width={width} height={height} label={label} dispatch={dispatch} />
                  </Row>
               ))}
            </Row>
         )}
      </>
   );
};

export default SizeControls;

const CustomFormat = ({ label, width, height, dispatch }) => {
   return (
      <>
         <Col xs={3}>
            <Form.Label>{label}</Form.Label>
         </Col>
         <Col>
            <Form.Label>Width [px]</Form.Label>
            <Form.Control
               type="number"
               value={width}
               onChange={(e) =>
                  dispatch({
                     type: type.SET_CUSTOM_FORMAT_WIDTH,
                     payload: e.target.value,
                  })
               }
            />
         </Col>
         <Col>
            <Form.Label>Height [px]</Form.Label>
            <Form.Control
               type="number"
               value={height}
               onChange={(e) =>
                  dispatch({
                     type: type.SET_CUSTOM_FORMAT_HEIGHT,
                     payload: e.target.value,
                  })
               }
            />
         </Col>
         <Col md={1} className="d-flex">
            <Button
               variant="danger"
               type="button"
               className="align-self-end"
               onClick={() =>
                  dispatch({
                     type: type.REMOVE_CUSTOM_FORMAT,
                     payload: label,
                  })
               }
            >
               <i className="fas fa-trash"></i>
            </Button>
         </Col>
      </>
   );
};
