/**
 * @file 文件上传api
 * @author linbingchen@baidu.com
 */
const formidable = require('formidable');
const {sendRes} = require('../utils/response');
const fs = require('fs');
const path = require('path');
module.exports = function (req, res) {
  let filePath = path.resolve(__dirname, '../../files/');

  console.log(filePath);

  // // 1 判断
  // if (!isFormData(req)) {
  //   res.statusCode = 400;
  //   res.end("错误的请求, 请用multipart/form-data格式");
  //   return;
  // }

  // 2 处理
  var form = new formidable.IncomingForm();
  form.uploadDir = filePath;
  form.keepExtensions = true;

  form.on('field', (field, value) => {
    console.log(field);
    console.log(value);
  });

  form.on('file', (name, file) => {
    // 重命名文件
    fs.renameSync(file.path, filePath + '/' + file.name);
  });

  form.on('end', () => {
    sendRes.bind(res)('', {filePath});
  });
  form.parse(req);
};
