const fs = require("fs");

class Db {
  constructor() {}
  writeFile(filePath, data) {
    return new Promise((reslove, reject) => {
      fs.writeFile(__dirname + "/data/" + filePath + ".json", data, (err) => {
        if (err) reject("err");
        else reslove("1");
      });
    });
  }
  readFile(filePath) {
    return new Promise((reslove, reject) => {
      fs.readFile(
        __dirname + "/data/" + filePath + ".json",
        "utf-8",
        (err, data) => {
          // console.error(err, "err");
          if (err) reject("err");
          else reslove(data);
        }
      );
    });
  }
  fileIsExist(filePath) {
    return new Promise((reslove, reject) => {
      fs.access(__dirname + "/data/" + filePath + ".json", (err, stats) => {
        console.error(err);
        if (err) reslove(false);
        else reslove(true);
      });
    });
  }
}

const db = new Db();

module.exports = db;
