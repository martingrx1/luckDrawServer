/**
 * @file mongodb数据库连接处理
 * @author linbingchen@baidu.com
 */

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data", (error) => {
  if (error) {
    console.error(`Connect failed: ${error}.`);
  } else {
    console.log("Connect success.");
  }
});

module.exports = mongoose;
