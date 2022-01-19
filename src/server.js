const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
    transports: ['websocket', 'polling']
  });

  io.on('connection', client => {
    setInterval(() => {
      os.cpuUsage(cpuPercent => {
        client.emit('cpu', {
          name: new Date().toLocaleTimeString(),
          value: cpuPercent
        });
      });
    }, 5000);
  });

server.listen(4500,()=> console.log('server running on port 4500'));