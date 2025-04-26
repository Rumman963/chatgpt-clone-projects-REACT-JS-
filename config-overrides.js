module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer"),
    "url": require.resolve("url"),
    "process": require.resolve("process/browser")
  };
  return config;
}; 