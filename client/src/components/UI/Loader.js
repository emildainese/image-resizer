import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ classes, style }) => {
  return (
    <div className={`text-center ${classes}`} style={style}>
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default Loader;
