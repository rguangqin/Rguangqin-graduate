/* eslint valid-jsdoc: "off" */
'use strict';
// const { RuleTester } = require("eslint");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615297301975_1744';
  // add your middleware config here
  config.middleware = [];
  // 关闭csrf
  // 框架内部针对表单 POST 请求均会验证 CSRF 的值，因此我们在表单提交时，请带上 CSRF key 进行提交，
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 跨域
  config.cors = {
    origin: 'http://localhost:8080',
    // 是否携带cookie
    credentials: true,
  };
  // 启用上传文件模式
  config.multipart = {
    mode: 'file',
    fields: 100,
    fieldSize: '100kb',
    fileSize: '10mb',
    files: 20,
  };
  // 配置 session?
  config.session = {
    key: 'rgq',
    maxAge: 1000 * 3600 * 24, // 1 天
    httpOnly: true,
    encrypt: true, // 加密
  };
  // POST 数据大小限制
  config.bodyParser = {
    jsonLimit: '1gb',
    formLimit: '1gb',
  };
  // 数据库配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'gourmet',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
