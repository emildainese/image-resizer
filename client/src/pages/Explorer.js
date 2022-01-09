import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TreeView from '../components/treeview/TreeView';
import { fetchProjects } from '../store/actions/explorerActions';

//TODO use refs
const Explorer = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.explorer);

  useEffect(() => {
    dispatch(fetchProjects('img'));
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary">Project Explorer</h2>
      <Row>
        <Col className="text-white">
          {projects && <TreeView data={projects} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Explorer;
