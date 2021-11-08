module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      "/plan": {
        target: "http://10.154.5.146:7002/mock/1134/warpdrive/v1/server/",
        changOrigin: true,
        pathRewrite: {
          "^/plan": "",
        },
      },
    },
  },
};
