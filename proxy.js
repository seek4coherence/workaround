// proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// catch everything under "/chat" (and other v1 endpoints if needed)
app.use('/*', createProxyMiddleware({
  target: 'https://openrouter.ai',
  changeOrigin: true,
  secure: true,
  pathRewrite: (path) => {
    // e.g. "/chat/completions" -> "/api/v1/chat/completions"
    return '/api/v1' + path;
  },
  onProxyReq: (proxyReq, req) => {
    if (req.headers['authorization']) {
      proxyReq.setHeader('authorization', req.headers['authorization']);
    }
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
