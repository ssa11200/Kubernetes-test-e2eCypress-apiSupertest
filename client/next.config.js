const withPWA = require('next-pwa');
const customCache = require('./custom-cache');


// used to file change hot reloading when running inside a container
module.exports = withPWA({
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  pwa: { dest: 'public', runtimeCaching: customCache, disable: process.env.NODE_ENV === 'development', }
});
