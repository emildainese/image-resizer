const Rect = ({ width, height, color, strokeWidth = 1, stroke, ...props }) => (
   <svg width={width} height={height} {...props}>
      <rect width={width} height={height} style={{ fill: color, strokeWidth, stroke: stroke ? stroke : color }} />
   </svg>
);

export default Rect;
