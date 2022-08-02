import { Table } from "react-bootstrap";
import Thumb from "../../UI/Thumb";

const uuid = (n = 6) => Math.random(n).toString().slice(2);

const ProjectTable = ({ tableRef, fields, projects }) => {
   return (
      <Table striped bordered hover bg="dark" responsive size="md" ref={tableRef}>
         <thead>
            <tr>
               {fields.map((field) => (
                  <th key={field} className="text-center align-middle">
                     {field}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {projects.map((project, idx) => (
               <tr key={projects[idx].id}>
                  {Object.entries(project).map(([key, value]) => {
                     return (
                        <>
                           {key === "fileName" && (
                              <td key={`${key}-${uuid()}`}>
                                 <span className="d-flex justify-content-center align-items-center">
                                    <Thumb fileName={value} />
                                 </span>
                              </td>
                           )}
                           {key === "createdAt" ? (
                              <td
                                 key={`${key}-${uuid()}`}
                                 style={{ maxWidth: "2rem" }}
                                 className="text-center align-middle"
                              >
                                 {value.split(" ")[0]}
                              </td>
                           ) : (
                              key !== "url" &&
                              key !== "fileName" && (
                                 <td key={`${key}-${uuid()}`} className="text-center align-middle">
                                    {value}
                                 </td>
                              )
                           )}
                        </>
                     );
                  })}
               </tr>
            ))}
         </tbody>
      </Table>
   );
};

export default ProjectTable;
