const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api/v1', createProxyMiddleware({
  target: 'https://openrouter.ai',
  changeOrigin: true,
  secure: true,
  pathRewrite: { '^/api/v1': '/api/v1' },
  onProxyReq: (proxyReq, req) => {
    if (req.headers['authorization']) {
      proxyReq.setHeader('authorization', req.headers['authorization']);
    }
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}/api/v1`));
