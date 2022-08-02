import { groupBy } from "../util/groupby.js";
import { data as projects } from "./data.js";

const grouped = groupBy(projects, "format");
const data1 = [];
const data2 = [];
for (const format in grouped) {
   data1.push({ [format]: grouped[format].length });
   grouped[format].forEach((format) => {
      data2.push({ aspectRatio: +(format.width / format.height).toPrecision(2) });
   }, 0);
}

console.log(data1);
console.log(data2);
