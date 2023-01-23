import http from 'node:http';

const server = http.createServer((request, response) => {
  return response.end('hello application');
});

server.listen(3333);
('');
