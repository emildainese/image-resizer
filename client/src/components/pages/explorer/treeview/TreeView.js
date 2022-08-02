import React, { useEffect } from "react";
import Leaf from "./Leaf";
import { togglerHandler, lineOnlyForRootsNode } from "./api";
import "./TreeView.scss";

//TODO use refs
const TreeView = ({ data, onlyRoot, flat }) => {
   //No usare dei refs
   useEffect(() => {
      const togglers = document.getElementsByClassName("fas fa-folder");
      const togglersArray = Array.from(togglers);
      if (onlyRoot && !flat) {
         lineOnlyForRootsNode();
      }
      togglersArray.forEach((toggler) => {
         toggler.addEventListener("click", () => togglerHandler(toggler));
         toggler.click();
      });

      return () => {
         togglersArray.forEach((toggler) => toggler.removeEventListener("click", () => togglerHandler(toggler)));
      };
   }, [onlyRoot, flat]);

   return (
      <div className="container" style={{ minWidth: "350px" }}>
         <div className="row">
            <div className="col-12 col-md-10 p-3" id="tree">
               <ul className="list-group tree-view">{createTreeView(data, onlyRoot, flat)}</ul>
            </div>
         </div>
      </div>
   );
};

const createTreeView = (treeData, onlyRoot, flat) => {
   const elems = [];

   treeData.forEach((node) => {
      elems.push(
         <Leaf
            node={node}
            flat={flat}
            onlyRoot={onlyRoot}
            key={Math.random().toFixed(6)}
            createTreeView={createTreeView}
         />
      );
   });

   return elems;
};

export default React.memo(TreeView);
