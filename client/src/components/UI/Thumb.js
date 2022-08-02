import React from "react";

const extract = (fileName) => {
  const fragment = fileName.split("-");
  return {
    year: fragment[0],
    month: fragment[1],
    format: fragment[fragment.length - 1].split(".")[0],
  };
};

const Thumb = ({ fileName }) => {
  const { year, month, format } = extract(fileName);
  return (
    <img
      src={`/upload/img/${year}/${month}/${format}/${fileName}`}
      className="img-fluid rounded-circle"
      style={{
        objectFit: "cover",
        maxWidth: 80,
        maxHeight: "80%",
        aspectRatio: "1",
      }}
      alt="broken"
    />
  );
};

export default Thumb;
