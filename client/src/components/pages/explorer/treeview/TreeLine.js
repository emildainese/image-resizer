import React from "react";

const TreeLine = ({ vertical, height = 42, width = 33, thickness = 5 }) => {
  const lineRef = React.useRef();

  return (
    <div
      ref={lineRef}
      className="line bg-primary"
      style={{
        position: "absolute",
        top: 0,
        left: `${-width}px`,
        width: `${thickness}px`,
        height: "100%",
      }}
    >
      {!vertical && (
        <div
          className="bg-primary"
          style={{
            position: "relative",
            top: `${height / 2}px`,
            left: "0px",
            width: `${width}px`,
            height: `${thickness}px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default TreeLine;
