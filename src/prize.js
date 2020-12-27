const server = require("../server");
const db = require("../db");

server.get("/api/getPrize", (req, res) => {
  db.readFile("prize")
    .then((data) => {
      res.end(data);
    })
    .catch((err) => {
      console.error(err, "err");
      res.end(err);
    });
});

server.post("/api/upload", (req, res) => {
  let path = "";
  // // 1 判断
  // if (!isFormData(req)) {
  //   res.statusCode = 400;
  //   res.end("错误的请求, 请用multipart/form-data格式");
  //   return;
  // }
  // 2 处理
  var form = new formidable.IncomingForm();
  form.uploadDir = "./files";
  form.keepExtensions = true;

  form.on("field", (field, value) => {
    console.log(field);
    console.log(value);
  });
  form.on("file", (name, file) => {
    // 重命名文件
    path = "./files/" + file.name;
    fs.renameSync(file.path, path);
  });
  form.on("end", () => {
    res.end(
      JSON.stringify({
        path: "http://a.localhost:8000/" + path.replace(/\.\//g, ""),
      })
    );
  });
  form.parse(req);
});

server.post("/api/postPrize", (req, res) => {
  let chunk = "";
  req.on("data", (r) => {
    chunk += r;
  });

  req.on("end", async () => {
    // console.log(JSON.parse(chunk));
    try {
      let fileIsExist = await db.fileIsExist("prize");
      if (fileIsExist) {
        let prizeData = await db.readFile("prize");
        console.log(prizeData);
        prizeData = JSON.parse(prizeData);
        chunk = JSON.parse(chunk);
        prizeData.push(chunk);
        let data = await db.writeFile("prize", JSON.stringify(prizeData));
        res.end(data);
      } else {
        let data = JSON.parse(chunk);
        await db.writeFile("prize", JSON.stringify([data]));
        res.end(chunk);
      }
    } catch (error) {
      console.log(error);
      res.end("400");
    }
  });
});
