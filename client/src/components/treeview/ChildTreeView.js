import React from 'react';

const ChildTreeView = ({ children, node, flat }) => {
  return (
    <ul
      className={`${flat ? 'list-group' : ''} tree-view nested`}
      id={node.label}
    >
      {children}
    </ul>
  );
};

export default ChildTreeView;
