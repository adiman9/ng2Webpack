const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  const _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: './coverage/',
        reporters: [
					{type: 'html', subdir: 'report-html'},
					{type: 'text-summary'}
				]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  };

  config.set(_config);
};
