const server = require("../server");
const db = require("../db");

const router = [
  {
    path: "/",
    children: [
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
      {
        title: "试卷购买",
        path: "/paper",
      },
      {
        title: "试卷后台",
        path: "/paperPlatform",
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
        path: "*",
        title: "404",
      },
    ],
  },
];

db.writeFile("router", JSON.stringify(router)).then((res) => {
  console.log(res);
});

server.get("/api/getRouter", (req, res) => {
  db.readFile("router")
    .then((data) => {
      res.end(data);
    })
    .catch((err) => {
      console.error(err, "err");
      res.end(err);
    });
});
