const Hapi = require('@hapi/hapi');
const Routes = require('./Routes');

const init = async () => {
  const server = Hapi.Server({
    host: '0.0.0.0',
    port: 8080,
  });
  server.route(Routes);
  await server.start();
  console.log('Server running at port:', server.info.uri);
};

init();
