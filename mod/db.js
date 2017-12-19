'use strict';
/** 驱动 mongodb
 * 开启服务器的终端不要关闭
 * 1. 引入模块
 * 2. 获取连接对象
 * 3. 获取连接数据库服务器的地址
 * 4. 开始连接
 */
const mongodb = require('mongodb'); // 1. 引入模块

let db = {
  link: function(callback) {
    let mc = mongodb.MongoClient; // 2. 获取连接对象
    let mcUrl = 'mongodb://127.0.0.1:27017'; // 3. 获取连接地址
    mc.connect(mcUrl, function(err, client) { // 4. 开始连接
      if (err) throw err;
      callback(client);
    })// connect end
  }, //link end
  findAll: function(options) {
    this.link(function(client) {
      if (options.message) console.log(options.message);
      client.db(options.db).collection(options.collection).find().toArray(function(err, docs) {
        if (err) throw err;
        client.close();
        options.callback(docs);
      })
    }) // link end
  }, // findAll end
  findOne: function(options) {
    this.link(function(client) {
      if (options.message) console.log(options.message);
      client.db(options.db).collection(options.collection).findOne({_id:options._id}, function(err, doc) {
        if (err) throw err;
        client.close();
        options.callback(doc);
      })
    }) // link end
  }, // findOne end
  insertOne: function(options) {
    this.link(function(client) {
      if (options.message) console.log(options.message);
      client.db(options.db).collection(options.collection).insertOne(options.obj, function(err) {
        if (err) throw err;
        client.close();
        options.callback();
      })
    }) // link end
  }, // insertOne end
  updateOne: function(options) {
    this.link(function(client) {
      if (options.message) console.log(options.message);
      client.db(options.db).collection(options.collection).update(options.filter, options.obj, function(err) {
        if (err) throw err;
        client.close();
        options.callback();
      })
    }) // link end
  }, // updataOne end
  objectId: function(urlId) {
    return mongodb.ObjectId(urlId);
  }, // objectId en'd
} // db end

module.exports = db;
