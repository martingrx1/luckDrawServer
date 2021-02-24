/**
 * @file 上传试卷的接口
 * @author linbingchen@baidu.com
 */
const {makeExecutableSchema} = require('@graphql-tools/schema');
const mongoose = require('../../db/connect');
const paperSchema = require('../scheme/paper');

var typeDefs = `
input Paper{
    name: String!,
    college: String!,
    major: String!,
    type: [String]!,
    hasAnswer: Boolean!,
    price: Int!,
    filePath: String,
}
type InsertRes{
  id:String
}
type Query{
  getPaper:Int
}
type Mutation{
    uploadPaper(input:Paper):InsertRes
} 
`;

var resolvers = {
  Query: {
    getPaper: () => {
      return 2;
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
