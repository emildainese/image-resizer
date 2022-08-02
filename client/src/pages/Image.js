import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../components/UI/Title";

const Image = () => {
  const { id } = useParams();

  return (
    <Container className="mt-5">
      <Title title={`Your Image ${id}`} />
      <Row>
        <Col md={8} className="mx-auto">
          <p>This is image {id}</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8} className="mx-auto">
          <Link className="btn btn-primary" to="/gallery">
            Go to Gallery
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Image;
