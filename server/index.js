const http = require("http");

const { fileGetaway } = require("./fileGetaway");

class Server {
  constructor(port) {
    this.init();
    this.getMethods = {};
    this.postMethods = {};
  }
  init() {
    this.server = http.createServer((req, res) => {
      console.log(req.headers.host);
      let initResHeader = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
      };
      this.setResponseHeader(initResHeader, res);

      if (/\./.test(req.headers.host)) {
        this.fileGetaway(req, res, req.url);
        return;
      }

      if (/\/api\//.test(req.url)) {
        this.apiGetaway(req, res, req.url);
      } else {
        this.fileGetaway(req, res, req.url);
      }
    });
    this.server.listen(8000);
  }
  setResponseHeader(setting, res) {
    for (const key in setting) {
      if (setting.hasOwnProperty(key)) {
        res.setHeader(key, setting[key]);
      }
    }
  }
  get(url, cb) {
    this.getMethods[url] = cb;
  }
  post(url, cb) {
    // console.log(url);
    this.postMethods[url] = cb;
    // console.log(this.postMethods);
  }
  apiGetaway(req, res, url) {
    if (req.method === "GET") {
      this.getMethods[url](req, res);
    } else if (req.method === "POST") {
      this.postMethods[url](req, res);
    } else {
      res.end("202");
    }
  }
}

Server.prototype.fileGetaway = fileGetaway;

const server = new Server();

module.exports = server;
