import { Image } from "../../models/index.js";
import chokidar from "chokidar";
import path from "path";

const __dirname = path.resolve();

const debug = false;

//------------------------------------------------------------------------
// Simple file watcher for sync filesystem operation and database actions
//------------------------------------------------------------------------

export default class Watcher {
  static defaultFilePath = path.join(__dirname, "upload", "img");

  static defaultOptions = {
    depth: 3,
    usePolling: false,
    persistent: false,
  };

  static async onAdd(filePath, stats) {
    debug && console.log(`[Watcher Add]: file ${filePath} has been added`);
    const imageSize = (stats.size / 1024).toFixed(2);
    const fileName = path.basename(filePath);
    await Image.update(
      { imageSize },
      {
        where: {
          fileName,
        },
      }
    );
  }

  static async onDelete(filePath) {
    debug && console.log(`[Watcher Unlink]: file ${filePath} has been removed`);
    const fileName = path.basename(filePath);
    await Image.destroy({
      where: {
        fileName,
      },
    });
  }

  static async onChange(filePath, stats) {
    debug && console.log(`[Watcher Change]: file ${filePath} has been changed`);
  }

  static watch(filePath, options) {
    const watchPath = filePath ? filePath : Watcher.defaultFilePath;
    const watchOptions = options ? options : Watcher.defaultOptions;

    chokidar
      .watch(watchPath, watchOptions)
      .on("add", Watcher.onAdd)
      .on("unlink", Watcher.onDelete)
      .on("change", Watcher.onChange);
  }
}
