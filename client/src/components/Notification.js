import { Alert } from 'react-bootstrap';

const Notification = ({ error, data, success }) => {
  let notification = null;

  if (error) {
    notification = (
      <div className="d-flex justify-content-center">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </div>
    );
  }

  if (success) {
    notification = (
      <div className="d-flex justify-content-center">
        <Alert variant="success" className="text-center">
          {data && data.message}
        </Alert>
      </div>
    );
  }

  return notification;
};

export default Notification;
