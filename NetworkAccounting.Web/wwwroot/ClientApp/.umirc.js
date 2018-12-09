
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'appXYZ',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],

  ],
  define:{
    "process.env.TEST":"TEST123"
  },
  proxy: {
    "/api": {
      "target": "http://localhost:5000",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "/api" }
    }
  },
  chainWebpack(config, { webpack })
  {
    console.log(`Configure Webpack`);
    // Set alias
    // config.resolve.alias.set('a', 'path/to/a');

    // Delete progress bar plugin
    // config.plugins.delete('progress');
  }
}
