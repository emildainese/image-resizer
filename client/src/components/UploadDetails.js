import { Row, Col, Table } from 'react-bootstrap';

const UploadDetails = ({ data }) => {
  return (
    <Row>
      <Col>
        <Table striped bordered hover bg="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Original file name</th>
              <th>Format</th>
              <th>Path</th>
              <th>Filename</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.images[0])
              .slice(1)
              .map((img, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{data.images[0].originalname}</td>
                    <td>{img[0]}</td>
                    <td>{img[1].filename}</td>
                    <td>{img[1].path}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UploadDetails;
