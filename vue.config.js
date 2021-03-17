"use strict";

module.exports = {
  publicPath: "/order-inquiry",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/order-inquiry/api": {
        target: "http://order.api.oa.test.huaperfect.com",
        changeOrigin: true,
        pathRewrite: {
          "^/order-inquiry/api": ""
        }
      }
    }
  }
};
