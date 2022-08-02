import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function BaseBarChart({ width, height, data }) {
   return (
      <BarChart width={width} height={height} data={data} margin={{}}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip labelStyle={{ color: "black" }} />
         <Legend />
         <Bar dataKey="originalSize" fill="#8884d8" />
         <Bar dataKey="size" fill="#82ca9d" />
         <Bar dataKey="reductionRatio" fill="blueviolet" />
      </BarChart>
   );
}
