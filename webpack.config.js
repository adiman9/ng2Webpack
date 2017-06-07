const npmEnv = process.env.npm_lifecycle_event;
let config;

// Run the production ready config to the build
if(npmEnv === 'build') {
  config = require('./config/webpack.prod.js');
}else if(npmEnv === 'test'){
  // Test config for phantomJS
  config = require('./config/webpack.test.js');
}else if(npmEnv === 'test:browser'){
  // Testing in the browser
}else{
  // Dev config
  config = require('./config/webpack.dev.js');
}

module.exports = config;
