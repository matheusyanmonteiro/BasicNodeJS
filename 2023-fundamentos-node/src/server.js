import http from 'node:http';

//stateful method for saving data.
const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET' && url === '/users') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    return response.end('Criaçãõ de usuários');
  }

  return response.end('index application');
});

server.listen(3333);
