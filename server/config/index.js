/**
 * @file
 * @author linbingchen@baidu.com
 */

module.exports = {
  PORT: 8887,
  HOST: process.env.NODE_ENV === 'development' ? 'localhost' : ''
};
