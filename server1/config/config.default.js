/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1600591505796_9300";

    // add your middleware config here
    config.middleware = [];

    // 关闭 csrf
    config.security = {
        csrf: {
            enable: false,
        },
    };
    // 跨域
    config.cors = {
        origin: "http://192.168.43.111:8080/",
        credentials: true,
    };

    // 启用上传文件模式
    config.multipart = {
        mode: "file",
    };

    // 配置 session
    config.session = {
        key: "jethro",
        maxAge: 1000 * 3600 * 24, // 1 天
        httpOnly: true,
        encrypt: true, // 加密
    };

    // POST 数据大小限制
    config.bodyParser = {
        jsonLimit: "1gb",
        formLimit: "1gb",
    };

    // 数据库配置
    config.mysql = {
        client: {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "root",
            database: "gourmet",
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
