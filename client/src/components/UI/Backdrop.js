import React from "react";

const Backdrop = ({ rgb = "0,0,0", alpha = 0.3 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: `rgba(${rgb},${alpha})`,
        zIndex: 1,
      }}
    ></div>
  );
};

export default Backdrop;
