import { Table } from "react-bootstrap";

const UploadDetails = ({ data }) => {
  return (
    <Table striped bordered hover bg="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Format</th>
          <th>Path</th>
          <th>Uploaded File</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data.images[0])
          .slice(1)
          .map((img, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{img[0]}</td>
                <td>{img[1].filename}</td>
                <td>{img[1].path}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default UploadDetails;
