import React from "react";
import ChildTreeView from "./ChildTreeView";
import TreeLine from "./TreeLine";
import { hasChildren } from "./api";
import { Button } from "react-bootstrap";
import Thumb from "../../../UI/Thumb";

const Leaf = ({ node, flat, onlyRoot, createTreeView }) => {
   if (hasChildren(node)) {
      return (
         <li className="position-relative">
            {node.label !== "Your Projects" && !flat && <TreeLine node={node} />}
            <span className="list-group-item d-flex align-items-center">
               <i className="fas fa-folder me-2" style={{ cursor: "pointer" }}></i>
               {node.label === "Your Projects" ? (
                  <h3 className="lead">{node.label}</h3>
               ) : (
                  <h5 className="lead">{node.label}</h5>
               )}
            </span>

            <ChildTreeView node={node} flat={flat}>
               {createTreeView(node.children)}
            </ChildTreeView>
         </li>
      );
   }

   return (
      <li className="position-relative">
         {!flat && <TreeLine node={node} vertical={onlyRoot} />}
         <span className="list-group-item">
            <i className="fas fa-folder me-2" style={{ cursor: "pointer" }}></i>
            {node.label}
         </span>
         {node.files && (
            <ul className="tree-view nested">
               {node.files.map((file) => (
                  <li
                     className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                     key={file}
                     id={file}
                     style={{ top: "1px", minHeight: "6rem" }}
                  >
                     <span className="me-4 me-sm-0">
                        <Thumb fileName={file} />
                     </span>
                     <span className="d-none d-lg-block">{file}</span>
                     <span className="d-sm-inline-block">
                        <Button variant="success" className="btn-sm me-1" style={{ minWidth: 33.5 }}>
                           <i className="fas fa-download"></i>
                        </Button>
                        <Button variant="warning" className="btn-sm me-1" style={{ minWidth: 33.5 }}>
                           <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="danger" className="btn-sm me-1" style={{ minWidth: 33.5 }}>
                           <i className="fas fa-trash"></i>
                        </Button>
                     </span>
                  </li>
               ))}
            </ul>
         )}
      </li>
   );
};

export default Leaf;

export const shorten = (str, len) =>
   `${str.substring(0, len)} ... ${str.match(/-\w+.(jpe?g|png)$/)[0].replace("-", "")}`;
