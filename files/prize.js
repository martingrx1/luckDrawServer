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
