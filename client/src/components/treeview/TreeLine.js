import React from 'react';

const TreeLine = ({ vertical, height = 42, width = 33, thickness = 5 }) => {
  const lineRef = React.useRef();

  return (
    <div
      ref={lineRef}
      className="line"
      style={{
        position: 'absolute',
        top: 0,
        left: `${-width}px`,
        backgroundColor: '#007bff',
        width: `${thickness}px`,
        height: '100%',
      }}
    >
      {!vertical && (
        <div
          style={{
            position: 'relative',
            top: `${height / 2}px`,
            left: '0px',
            backgroundColor: '#007bff',
            width: `${width}px`,
            height: `${thickness}px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default TreeLine;
