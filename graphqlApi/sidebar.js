var { buildSchema } = require("graphql");
const db = require("../db");

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type Query {
    sidebar: String
  }
`);

const typeDefs = `
  # the schema allows the following query:
  type Query {
    posts: String
  }

`;

db.writeFile("sidebar", JSON.stringify(siderbar)).then((res) => {
  console.log(res);
});

const siderbar = [
  {
    title: "试卷购买",
    path: "/paper",
  },
  {
    title: "试卷上传",
    path: "/uploadPaper",
  },
  {
    title: "抽奖",
    path: "/draw",
  },
  {
    title: "后台配置",
    path: "/config",
    children: [
      {
        title: "奖品配置",
        path: "/prize",
      },
      {
        title: "小花花配置",
        path: "/flower",
      },
    ],
  },
];

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  sidebar: () => {
    return new Promise((reslove, reject) => {
      db.readFile("sidebar")
        .then((data) => {
          reslove(data);
        })
        .catch((err) => {
          console.error(err, "err");
          reslove("error");
        });
    });
  },
};

const resolvers = {
  Query: {
    posts: () => "232332",
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
