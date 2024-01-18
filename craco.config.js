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
          zlib: require.resolve('browserify-zlib'),
          assert: require.resolve('assert/'),
          util: require.resolve('util/'),
          stream: require.resolve('stream-browserify'),
        
        }
      }
    }
  }
};
