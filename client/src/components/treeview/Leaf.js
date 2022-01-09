import React from 'react';
import ChildTreeView from './ChildTreeView';
import TreeLine from './TreeLine';
import { hasChildren } from './api';
import { Button } from 'react-bootstrap';

const Leaf = ({ node, flat, onlyRoot, createTreeView }) => {
  if (hasChildren(node)) {
    return (
      <li className="position-relative">
        {node.label !== 'Your Projects' && !flat && <TreeLine node={node} />}
        <span className="list-group-item d-flex align-items-center">
          <i className="fas fa-folder me-2" style={{ cursor: 'pointer' }}></i>
          {node.label}
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
        <i className="fas fa-folder me-2" style={{ cursor: 'pointer' }}></i>
        {node.label}
      </span>
      {node.files && (
        <ul className="tree-view nested">
          {node.files.map((file) => (
            <li
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              key={file}
              id={file}
              style={{ top: '1px' }}
            >
              {`${file.substring(0, 20)} ... ${file
                .match(/-\w+.(jpe?g|png)$/)[0]
                .replace('-', '')}`}
              <div>
                <Button variant="success" className="btn-sm me-1">
                  <i className="fas fa-download"></i>
                </Button>
                <Button variant="warning" className="btn-sm me-1">
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="danger" className="btn-sm me-1">
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Leaf;
