'use strict';
const querystring = require('querystring');

/** 自己模拟 body-parser 中间件 */
let fakeBodyParser = function(req, res, next) {
  let bufferArr = [];
  req.on('data', function(chunk) {
    bufferArr.push(chunk);
  }) // on data end
  req.on('end', function() {
    let buffer = Buffer.concat(bufferArr).toString();
    let obj = querystring.parse(buffer);
    req.body = obj;
    /** 进入下一个中间件 */
    next();
  })
} // fakeBodyParser end

module.exports = fakeBodyParser;
