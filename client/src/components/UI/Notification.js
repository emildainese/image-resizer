import { Alert } from "react-bootstrap";

const Notification = ({ error, data, success, classNames }) => {
  let notification = null;

  if (error) {
    notification = (
      <div className={`d-flex justify-content-center ${classNames}`}>
        <Alert variant="danger" className="text-center text-white w-100">
          {error}
        </Alert>
      </div>
    );
  }

  if (success) {
    notification = (
      <div className={`d-flex justify-content-center ${classNames}`}>
        <Alert variant="success" className="text-center text-white w-100">
          {data && data.message}
        </Alert>
      </div>
    );
  }

  return notification;
};

export default Notification;
