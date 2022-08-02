import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Button, Card } from "react-bootstrap";
import Backdrop from "../../UI/Backdrop";

const ImageCard = ({ setImage, downloadImageHandler, deleteImageHandler, format, path, id, infoHeight, infoRef, style, classNames }) => {
   const [showBd, setShowBd] = useState(false);

   const showBackdrop = () => {
      setShowBd(true);
   };

   const hideBackdrop = () => {
      setShowBd(false);
   };

   return (
      <Col md={6} lg={3} className={`${classNames}`} style={{ ...style, marginBottom: "5rem" }}>
         <Card className="shadow-lg" onMouseEnter={showBackdrop} onMouseLeave={hideBackdrop}>
            <Card.Body className="p-0 position-relative bg-dark">
               {showBd && <Backdrop />}
               {setImage(path, format)}
               <div
                  ref={infoRef}
                  className="position-absolute text-white lead w-100 p-3 d-flex justify-content-between"
                  style={{
                     top: `calc(100% - ${infoHeight}px)`,
                     left: 0,
                     backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
               >
                  <div>
                     <strong>Image format: </strong> <span>{format}</span>
                  </div>
                  <div style={{ minWidth: "10%" }}>
                     <Link className="btn btn-secondary me-2" to={`/image/${id}`}>
                        <i className="fas fa-image"></i>
                     </Link>
                     <Button variant="primary" type="button" className="me-2" onClick={() => downloadImageHandler(path)}>
                        <i className="fas fa-download"></i>
                     </Button>
                     <Button variant="danger" type="button" onClick={() => deleteImageHandler(id, path)}>
                        <i className="fas fa-trash"></i>
                     </Button>
                  </div>
               </div>
            </Card.Body>
         </Card>
      </Col>
   );
};

ImageCard.defaultProps = {
   id: null,
   style: {},
   classNames: "",
};

export default ImageCard;
