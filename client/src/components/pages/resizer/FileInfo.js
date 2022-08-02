import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const theadFileds = [
  "File Name",
  "File Type",
  "File Size",
  "Image Width",
  "Image Height",
];

const FileInfo = ({ previewHeight }) => {
  const { file, imageWidth, imageHeight } = useSelector(
    (state) => state.resizer
  );

  return (
    <Row>
      <Col style={{ objectFit: "cover", maxHeight: `${previewHeight}px` }}>
        <Table>
          <thead>
            <tr>
              {theadFileds.map((fields, idx) => (
                <th key={idx}>{fields}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>{file.size / 1000} Kb</td>
              <td>{imageWidth} px</td>
              <td>{imageHeight} px</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default FileInfo;
