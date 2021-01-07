const server = require("../server");
const db = require("../db");

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

// const nodemailer = require("nodemailer");
// const fs = require("fs");
// const path = require("path");
// let transporter = nodemailer.createTransport({
//   // host: 'smtp.ethereal.email',
//   service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/ //   port: 465, // SMTP 端口
//   secureConnection: true, // 使用了 SSL
//   auth: {
//     user: "874146354@qq.com",
//     pass: "zmheftgssiaebbji", //授权码，并非QQ密码
//   },
// });
// let mailOptions = {
//   from: '"874146354@qq.com', // 发送地址
//   to: "1422659223@qq.com", // 接收列表（可多个）
//   subject: "Hello,this is alan from China!", // 主题 // 发送text或者html格式（任选一个）
//   // text: "Hello world！", // plain text body //html:  fs.createReadStream(path.resolve(__dirname,'index.html'))
//   html: "<div>11111</div>",
//   // attachments: [
//   //   //添加附件（可多个）
//   //   {
//   //     filename: "image",
//   //     path: path.resolve(__dirname, "2.jpg"),
//   //     cid: "01", //与上面的图片cid对应
//   //   },
//   //   {
//   //     filename: "a.txt",
//   //     content: "hello world!",
//   //   },
//   //   {
//   //     filename: "b.txt",
//   //     path: "./text.txt", //根目录新建即可
//   //   },
//   // ],
// };

// // 发送邮件
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(info);
// });
