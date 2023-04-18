const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // Replace 'http://localhost:8080' with the URL of your backend server
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
