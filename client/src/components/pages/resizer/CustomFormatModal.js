import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../../store/constants/resizerConstants";
import Notification from "../../UI/Notification";

const CLEAR_CUSTOM_FORMAT_ERROR_MS = 2000;
const CustomFormatModal = () => {
   const dispatch = useDispatch();

   const { customFormatLabel, customFormatWidth, customFormatHeight, customFormatError } = useSelector(
      (state) => state.resizer
   );

   useEffect(() => {
      const timer = setTimeout(() => {
         dispatch({ type: type.CLEAR_CUSTOM_FORMAT_ERROR });
         clearTimeout(timer);
      }, CLEAR_CUSTOM_FORMAT_ERROR_MS);
      return () => {
         if (timer) {
            clearTimeout(timer);
         }
      };
      //eslint-disable-next-line
   }, [customFormatError]);

   return (
      <Form>
         {customFormatError && <Notification error={customFormatError} />}
         <Form.Group className="mb-3">
            <Form.Label>Format Name</Form.Label>
            <Form.Control
               type="text"
               placeholder="Enter image format"
               value={customFormatLabel}
               onChange={(e) =>
                  dispatch({
                     type: type.SET_CUSTOM_FORMAT_LABEL,
                     payload: e.target.value.trim().replace(/[^a-zA-z\d-]+/, ""),
                  })
               }
            />
         </Form.Group>
         <Row>
            <Col>
               <Form.Group>
                  <Form.Label>Width [px]</Form.Label>
                  <Form.Control
                     type="number"
                     value={customFormatWidth}
                     onChange={(e) =>
                        dispatch({
                           type: type.SET_CUSTOM_FORMAT_WIDTH,
                           payload: e.target.value,
                        })
                     }
                  />
               </Form.Group>
            </Col>
            <Col>
               <Form.Group>
                  <Form.Label>Height [px]</Form.Label>
                  <Form.Control
                     type="number"
                     value={customFormatHeight}
                     onChange={(e) =>
                        dispatch({
                           type: type.SET_CUSTOM_FORMAT_HEIGHT,
                           payload: e.target.value,
                        })
                     }
                  />
               </Form.Group>
            </Col>
         </Row>
      </Form>
   );
};

export default CustomFormatModal;
