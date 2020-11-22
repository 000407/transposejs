module.exports = (env = {
   minify: false
}) => {
   return {
      entry: "./src/index.js",
      output: {
         libraryTarget: "umd",
         filename: env.minify ? "transpose.min.js" : "transpose.js"
      },
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: "babel-loader",
            }
         ]
      },
      optimization: {
        minimize: env.minify && env.minify === 'true'
      }
   }
};