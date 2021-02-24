/**
 * @file 响应工具
 * @author linbingchen@baidu.com
 */

/**
 * @name
 * @param {*} errContent 错误内容 , 空则没有错误
 * @param {*} content 正确返回内容
 * @return {*}
 */
function sendRes(errContent, content = '') {
  this.end(JSON.stringify({errContent, content}));
}

module.exports = {
  sendRes
};
