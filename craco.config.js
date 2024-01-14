module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            "assert": require.resolve("assert"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "url": require.resolve("url")
          }
        }
      }
    }
  };
  