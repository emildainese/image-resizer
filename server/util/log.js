export const log = (...items) => {
  for (let i = 0; i < items.length; ++i) {
    let toLog = items[i];
    if (typeof toLog === "object") {
      toLog = JSON.stringify(toLog, null, 2);
    }
    console.log(toLog);
  }
};
