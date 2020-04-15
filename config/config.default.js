/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.keys = appInfo.name + '_1584326095122_6862';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:7001', 'http://localhost:8080', 'http://localhost:8081', 'http://192.168.35.103:8080']
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
