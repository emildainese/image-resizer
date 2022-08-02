import React from "react";

const Circle = ({ height, width, cx, cy, radius, stroke, color, strokeWidth = 1, ...props }) => {
   return (
      <svg height={height} width={width} {...props}>
         <circle cx={cx} cy={cy} r={radius} stroke={stroke ? stroke : color} stroke-width={strokeWidth} fill={color} />
      </svg>
   );
};

export default Circle;
