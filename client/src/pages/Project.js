import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProjects } from "../store/actions/projectActions";
import * as type from "../store/constants/projectConstants";
import { groupBy } from "../util/groupby";
import { isEmpty } from "../util/validators";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import Title from "../components/UI/Title";
import Loader from "../components/UI/Loader";
import BaseModal from "../components/UI/BaseModal";
import Notification from "../components/UI/Notification";
import BaseBarChart from "../components/charts/BaseBarChart";
import ProjectTable from "../components/pages/projects/ProjectTable";
import Pagination from "../components/pages/projects/Pagination";
import Card from "../components/UI/Card";
import DoublePieChart from "../components/charts/DoublePieChart";

const rowCustomStyle = {
   padding: "0 5rem",
};

const Project = () => {
   const dispatch = useDispatch();
   const { loading, error, projects, numProjects, numImages } = useSelector((state) => state.projects);

   const [chartWidth, setChartWidth] = useState(500);

   const tableRef = useRef(null);

   const hasProjects = useCallback(() => !isEmpty(projects), [projects]);

   const barChartData = useMemo(() => projects.map(makeBarChartData), [projects]);
   
   const [data1, data2] = useMemo(() => makePieChartData(projects), [projects]);

   useLayoutEffect(() => {
      if (tableRef && tableRef.current && hasProjects()) {
         const { width } = tableRef.current.getBoundingClientRect();
         setChartWidth(+width);
      }
   }, [hasProjects]);

   useEffect(() => {
      if (!hasProjects()) {
         dispatch(fetchUserProjects(true));
      }
      // eslint-disable-next-line
   }, []);

   if (loading) {
      return <Loader style={{ marginTop: "5rem" }} />;
   }

   if (error) {
      return <BaseModal error={error} show={!!error} onClose={() => dispatch({ type: type.USER_PROJECTS_RESET })} />;
   }

   if (!hasProjects()) {
      return (
         <Container className="mt-5">
            <Title title="Projects Dashboard" />
            <Row className="mt-5">
               <Col md={8} className="mx-auto">
                  <Notification error="No projects available, please upload some photos!" />
                  <Link className="btn btn-primary" to="/">
                     Go to Upload
                  </Link>
               </Col>
            </Row>
         </Container>
      );
   }

   return (
      <Container className="mt-5 position-relative" fluid>
         <div className="position-absolute d-none d-lg-block" style={{ right: 0 }}>
            <Row className="flex-column">
               <Col md={10} className="mx-auto">
                  <Card title="Tot. Images" body={numImages} classNames="mb-3" />
                  <Card title="Tot. Projects" body={numProjects} classNames="mb-3" />
               </Col>
               <Col md={10} className="mx-auto">
                  <div className="d-flex justify-content-center">
                     <DoublePieChart width={380} height={350} data1={data1} data2={data2} />
                  </div>
               </Col>
            </Row>
         </div>
         <Title title="Project Dashboard" />
         <Row className="mb-5 offset-md-4">
            <Col md={3}>
               <Button
                  className="w-100 mb-3 mb-md-0"
                  variant="secondary"
                  type="button"
                  onClick={() => {
                     dispatch(fetchUserProjects(true));
                  }}
               >
                  <i className="fas fa-sync me-2"></i> Force Refresh
               </Button>
            </Col>
            <Col md={3}>
               <Button className="w-100" variant="primary" type="button" onClick={() => {}}>
                  <i className="fas fa-file-csv me-2"></i> Export CSV
               </Button>
            </Col>
         </Row>

         {hasProjects() && (
            <Row style={rowCustomStyle}>
               <Col lg={8} xl={10}>
                  <Row className="py-3 px-2">
                     <Col md={1}>Filter 1</Col>
                     <Col md={1}>Filter 2</Col>
                     <Col md={1}>Filter 3</Col>
                     <Col md={1}>Filter 4</Col>
                  </Row>
                  <ProjectTable tableRef={tableRef} fields={fields} projects={projects} />
                  <div className="d-flex mt-3 flex-row justify-content-center">
                     <Pagination />
                  </div>
               </Col>
               {/* <Col lg={4} xl={2}>
                  <div className="d-flex justify-content-center">
                     <DoublePieChart width={380} height={350} data1={data1} data2={data2} />
                  </div>
               </Col> */}
            </Row>
         )}
         {hasProjects() && (
            <Row style={rowCustomStyle}>
               <Title title="Optimization Ratio and Image Size Comparison" />
               <Col lg={8} xl={9}>
                  <BaseBarChart width={chartWidth} height={600} data={barChartData} />
               </Col>
            </Row>
         )}
      </Container>
   );
};

const makeBarChartData = ({ format, originalImageSize, imageSize, id }) => ({
   name: `img-${format}-${id}`,
   reductionRatio: (((originalImageSize - imageSize) / originalImageSize) * 100).toPrecision(4),
   originalSize: originalImageSize.toPrecision(4),
   size: imageSize,
});

const makePieChartData = (projects) => {
   const grouped = groupBy(projects, "format");
   const data1 = [];
   const data2 = [];
   for (const format in grouped) {
      data1.push({ count: grouped[format].length });
      grouped[format].forEach((format) => {
         const aspectRatio = +(format.width / format.height).toPrecision(2);
         data2.push({ aspectRatio });
      }, 0);
   }
   return [data1, data2];
};

const fields = [
   "id",
   "File Name",
   "Original Size",
   "Thumbnail",
   "Image Size",
   "Format",
   "Width",
   "Height",
   "Created At",
   "Project Id",
];

export const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

export default Project;
