const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app : any) {
  app.use(
    "/animes", 
    createProxyMiddleware({
      target: "https://graphql.anilist.co", 
      changeOrigin: true, 
    })
  );
};
