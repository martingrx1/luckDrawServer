/**
 * @file 试卷的scheme定义
 * @author linbingchen@baidu.com
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const types = {
  name: String,
  type: Array,
  hasAnswer: Boolean,
  price: Number,
  filePath: String
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

paperSchema.static('getPeperList', function (needs) {
  return new Promise((reslove, reject) => {
    this.find({}, [...needs], (err, doc) => {
      if (err) reject(err);
      reslove(doc);
    });
  });
});

module.exports = paperSchema;
