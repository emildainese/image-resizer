import { Image } from "./test.models/index.js";
import { log } from "../../util/log.js";
import { setupDatabase } from "./test.models/index.js";

export function* makeCounter(max, count) {
  for (let i = 0; i < max; ++i) {
    yield count++;
  }
}

export function* makeQueryImageByOffset(max = Infinity) {
  for (let i = 0; i < max; i++) {
    yield new Promise((resolve, reject) => {
      try {
        const image = Image.findOne({
          attributes: ["format", "url", "id", "projectId"],
          order: [["createdAt", "ASC"]],
          raw: true,
          offset: i,
        });
        resolve(image);
      } catch (err) {
        reject(err);
      }
    });
  }
}

function* makeQueryImage(max = Infinity, count = 1, byOffest = false) {
  for (let i = 0; i < max; i++) {
    yield new Promise((resolve, reject) => {
      try {
        const image = Image.findAll({
          attributes: ["format", "url", "id", "projectId"],
          order: [["createdAt", "ASC"]],
          raw: true,
          limit: count++,
        });
        resolve(image);
      } catch (err) {
        reject(err);
      }
    });
  }
}

const runQuery = async (queryIterator) => {
  for await (const item of queryIterator) {
    log("[Query Results]: ", item);
  }
};

(async () => {
  try {
    await setupDatabase();
    runQuery(makeQueryImage(3));
  } catch (error) {
    console.log("Errror: ", JSON.stringify(error, null, 2));
  }
})();
