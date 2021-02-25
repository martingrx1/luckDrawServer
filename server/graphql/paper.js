/**
 * @file 上传试卷的接口
 * @author linbingchen@baidu.com
 */
const {makeExecutableSchema} = require('@graphql-tools/schema');
const mongoose = require('../../db/connect');
const paperSchema = require('../scheme/paper');

var typeDefs = `
input InputPaper{
    name: String!,
    type: [String]!,
    hasAnswer: Boolean!,
    price: Int!,
    filePath: String,
}
type Paper{
  name:String
}
type InsertRes{
  id:String
}

type Query{
  getPaperList:[Paper]
}
type Mutation{
    uploadPaper(input:InputPaper):InsertRes
} 
`;

var resolvers = {
  Query: {
    getPaperList: async () => {
      try {
        const db = mongoose.connection;
        const paperModel = db.model('paper', paperSchema);
        return await paperModel.getPeperList(['name']);
      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
    uploadPaper: async (parent, arg) => {
      console.log(arg.input);
      try {
        const db = mongoose.connection;
        const paperModel = db.model('paper', paperSchema);
        return await paperModel.insertPaper(arg.input);
      } catch (err) {
        return err;
      }
    }
  }
};
module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
