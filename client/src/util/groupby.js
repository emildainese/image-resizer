export const groupBy = (arr, key, predicate) => {
  return arr.reduce((acc, curr) => {
    if (predicate) {
      (acc[predicate(curr[key])] = acc[predicate(curr[key])] || []).push(curr);
    } else {
      (acc[curr[key]] = acc[curr[key]] || []).push(curr);
    }
    return acc;
  }, {});
};
