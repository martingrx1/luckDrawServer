/**
 * @file 试卷的scheme定义
 * @author linbingchen@baidu.com
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const types = {
  name: String,
  college: String,
  major: String,
  type: Array,
  hasAnswer: Boolean,
  price: Number,
  fileSavePath: String
};

const paperSchema = new Schema(types);

paperSchema.static('insertPaper', function (paper) {
  return new Promise((reslove, reject) => {
    this.create(paper, (err, doc) => {
      if (err) reject(err);
      reslove(doc);
    });
  });
});

module.exports = paperSchema;
