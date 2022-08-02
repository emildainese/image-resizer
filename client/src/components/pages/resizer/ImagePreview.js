import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../store/constants/resizerConstants";

const ImagePreview = ({ previewHeight }) => {
   const [imageSrc, setImageSrc] = useState(null);
   const dispatch = useDispatch();
   const { file } = useSelector((state) => state.resizer);

   useEffect(() => {
      if (file) {
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);
         fileReader.onloadend = (e) => {
            const img = new Image();
            const src = fileReader.result;
            img.src = src;
            setImageSrc(src);
            img.onload = () => {
               dispatch({
                  type: action.SET_IMAGE_SIZE,
                  payload: {
                     height: img.naturalHeight,
                     width: img.naturalWidth,
                  },
               });
            };
         };
      }
   }, [file, dispatch]);

   return (
      <Row>
         {imageSrc && (
            <Col className="p-3 d-flex justify-content-center">
               <img src={imageSrc} className="img-fluid" alt="broken" style={{ objectFit: "cover", height: `${previewHeight}px` }} />
            </Col>
         )}
      </Row>
   );
};

export default ImagePreview;
