const path = require('path');
const Server = require('hapi').Server;
const Webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const config = require('./webpack.config.dev');
const Inert = require('inert');

const server = new Server();
server.connection({port: 3000});
server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join(__dirname, 'public')
    }
  }
});

server.ext('onPreResponse', (request, reply) => {
  if(request.response.isBoom && request.response.output.statusCode === 404) {
    return reply.file(
      path.join(__dirname, 'public/index.html')
    );
  }
  return reply.continue();
});

const compiler = new Webpack(config);
const assets = {
  noInfo: true,
  publicPath: config.output.publicPath
};
const hot = {};

server.register(
  {
    register: WebpackPlugin,
    options: {compiler, assets, hot}
  },
  error => {
    if(error) {
      return console.error(error);
    }
    server.start(
      () => console.log('Server running at:', server.info.uri)
    );
  }
);
