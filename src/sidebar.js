const server = require("../server");
const db = require("../db");

const siderbar = [
  {
    title: "试卷购买",
    path: "/paper",
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
        path: "flower",
      },
    ],
  },
];

db.writeFile("sidebar", JSON.stringify(siderbar)).then((res) => {
  console.log(res);
});

server.get("/api/getSiderBar", (req, res) => {
  db.readFile("sidebar")
    .then((data) => {
      res.end(data);
    })
    .catch((err) => {
      console.error(err, "err");
      res.end(err);
    });
});
