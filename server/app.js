/**
 * @file 服务器入口
 * @author linbingchen@baidu.com
 */

const express = require('express');
const app = express();
const graphql = require('./graphql/index');
const {uploadRouter, downloadRouter} = require('./api');

app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

app.use(graphql.path, graphql.middleware);

app.get('/api/download', downloadRouter);

app.post('/api/upload', uploadRouter);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
