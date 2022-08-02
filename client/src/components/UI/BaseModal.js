import React from "react";
import { Modal, Button } from "react-bootstrap";

const BaseModal = ({
  show,
  onClose,
  error,
  title = "Something went wrong!",
  message,
  children,
  actions,
  ...props
}) => {
  return (
    <Modal show={show} onHide={onClose} {...props}>
      <Modal.Header>
        <Modal.Title className={`${error ? "text-danger" : "text-primary"}`}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${error ? "text-danger" : "text-primary"}`}>
        {error ? error : message ? message : ""}
        {children}
      </Modal.Body>
      <Modal.Footer>
        {actions && actions}
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BaseModal;
