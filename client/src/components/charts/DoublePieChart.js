import React from "react";
import { PieChart, Pie, Legend } from "recharts";
import Rect from "./Rect";

const color1 = "#8884d8";
const color2 = "#82ca9d";

const DoublePieChart = ({ data1, data2, width, height }) => {
   return (
      <PieChart width={width} height={height} margin={{ top: 30 }}>
         <Pie data={data1} dataKey="count" cx="50%" cy="50%" outerRadius={60} fill={color1} label="format" />{" "}
         <Pie
            data={data2}
            dataKey="aspectRatio"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={115}
            fill={color2}
            label
         />
         <Legend content={<CustomLegend />} />
      </PieChart>
   );
};

const CustomLegend = () => {
   return (
      <div className="d-flex flex-row justify-content-center align-items-center">
         <div className="me-3" style={{ color: color1 }}>
            <Rect color={color1} width={10} height={10} /> Projects per format
         </div>
         <div className="justify-self-end" style={{ color: "#82ca9d" }}>
            <Rect color={color2} width={10} height={10} /> Aspect ratio
         </div>
      </div>
   );
};

// const CustomTooltip = ({ active, count, ratio, ...props }) => {
//    if (active) {
//       return (
//          <div className="custom-tooltip">
//             <div></div>
//             <div></div>
//          </div>
//       );
//    }
//    return null;
// };

export default DoublePieChart;
