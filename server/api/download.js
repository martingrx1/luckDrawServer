/**
 * @file 文件下载
 * @author linbingchen@baidu.com
 */

const {sendRes} = require('../utils/response');
const path = require('path');
module.exports = function (req, res) {
  const {filePath} = req.query;
  try {
    res.download(path.resolve(__dirname, filePath));
  } catch (e) {
    sendRes.bind(res)(e);
  }
};
