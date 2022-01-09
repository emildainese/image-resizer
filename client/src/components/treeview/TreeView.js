import React, { useEffect } from 'react';
import Leaf from './Leaf';
import { togglerHandler, lineOnlyForRootsNode } from './api';
import './TreeView.css';

//TODO use refs
const TreeView = ({ data, onlyRoot, flat }) => {
  const createTreeView = (treeData) => {
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

  //No usare dei refs
  useEffect(() => {
    const togglers = document.getElementsByClassName('fas fa-folder');
    const togglersArray = Array.from(togglers);
    if (onlyRoot && !flat) {
      lineOnlyForRootsNode();
    }
    togglersArray.forEach((toggler) =>
      toggler.addEventListener('click', () => togglerHandler(toggler))
    );
    return () => {
      togglersArray.forEach((toggler) =>
        toggler.removeEventListener('click', () => togglerHandler(toggler))
      );
    };
  }, [onlyRoot, flat]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mx-auto p-3" id="tree">
          <ul className="list-group tree-view">{createTreeView(data)}</ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TreeView);
