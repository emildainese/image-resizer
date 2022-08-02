import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/actions/explorerActions";
import Notification from "../components/UI/Notification";
import TreeView from "../components/pages/explorer/treeview/TreeView";
import Loader from "../components/UI/Loader";
import BaseModal from "../components/UI/BaseModal";
import * as type from "../store/constants/explorerConstants";
import Title from "../components/UI/Title";

/* Use refs in ThreeView */

const Explorer = () => {
   const dispatch = useDispatch();

   const { projects, loading, error } = useSelector((state) => state.explorer);

   const hasProjects = useCallback(() => projects && projects[0] && projects[0].children.length > 0, [projects]);

   useEffect(() => {
      if (!hasProjects()) {
         dispatch(fetchProjects("img", true));
      }
      // eslint-disable-next-line
   }, []);

   if (loading) {
      return <Loader style={{ marginTop: "5rem" }} />;
   }

   if (error) {
      return <BaseModal error={error} show={!!error} onClose={() => dispatch({ type: type.PROJECTS_CLEAR_ERROR })} />;
   }

   return (
      <Container className="mt-5">
         <Title title="Project Explorer" />
         {hasProjects(projects) ? (
            <>
               <Row className="mb-5 offset-md-2">
                  <Col md={4}>
                     <Button
                        className="w-100"
                        variant="secondary"
                        type="button"
                        onClick={() => {
                           dispatch(fetchProjects("img", true));
                        }}
                     >
                        <i className="fas fa-sync me-2"></i> Force Refresh
                     </Button>
                  </Col>
                  <Col md={4}>
                     <Button className="w-100" variant="success" type="button" onClick={() => {}}>
                        <i className="fas fa-save me-2"></i> Backup
                     </Button>
                  </Col>
               </Row>
               <Row>
                  <Col className="text-white mx-auto" xs={12}>
                     <TreeView data={projects} />
                  </Col>
               </Row>
            </>
         ) : (
            <Row className="mt-5">
               <Col md={8} className="mx-auto">
                  <Notification error="No projects available, please upload some photos!" />
                  <Link className="btn btn-primary" to="/">
                     Go to Upload
                  </Link>
               </Col>
            </Row>
         )}
      </Container>
   );
};

export default Explorer;
