import React from "react";

const Title = ({ title, classNames, style, ...props }) => {
  return (
    <h2
      className={`lead display-4 text-center text-primary text-gradient mb-3 p-3 ${classNames}`}
      style={style}
      {...props}
    >
      {title}
    </h2>
  );
};

export default Title;
