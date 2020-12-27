const db = require("../db");
const path = require("path");
const fs = require("fs");

function fileGetaway(req, res, url) {
  let fileName = path.join(path.resolve("./files", "fox.jpg"));
  let stream = fs.createReadStream(fileName);
  stream.pipe(res);
}

exports.fileGetaway = fileGetaway;
