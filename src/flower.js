const server = require("../server");
const db = require("../db");

const flower = {
  account: 1000,
  event: {},
};

db.writeFile("flower", JSON.stringify(flower)).then((res) => {
  console.log(res);
});

server.get("/api/getFlower", (req, res) => {
  db.readFile("flower")
    .then((data) => {
      res.end(data);
    })
    .catch((err) => {
      console.error(err, "err");
      res.end(err);
    });
});

server.post("/api/postFlowerEvent", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log(JSON.parse(data));
    res.end("11111");
  });
});
