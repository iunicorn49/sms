'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./mod/config.js');
const router = require('./mod/router.js');
const fun = require('./mod/fun.js');

/** 实例化express对象 */
let app = express();

/** 配置自定义模板 */
app.set('views', fun.path('/htmls'));
app.engine('html', require('ejs').renderFile); // 自定义模板引擎
app.set('view engine', 'html'); // 设置模板引擎

/** 用于获取 post 表单数据, 一定要放在路由前面 */
app.use(bodyParser.urlencoded({extended:false}));

/** 注册路由 */
app.use(router);

/** 开启服务 */
app.listen(config.port, function() {
  console.log(`服务器已开启: ${config.hosts}:${config.port}`);
})
