module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          querystring: require.resolve('querystring-es3'),
          path: require.resolve('path-browserify'),
          buffer: require.resolve('buffer/'),
        }
      }
    }
  }
};
