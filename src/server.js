const server = require('http').createServer();
const os = require('os-utils');
const port = '443' || '80';
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

server.listen(port,()=> console.log(`server running on port ${port}`));