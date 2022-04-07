const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
var index = require('./routes/index');
const port = 3001;
const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));
const io = socketIo(server, { cors: { origin: '*' } });
let interval;
io.on('connection', (socket) => {
  console.log('New Socket client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
const getApiAndEmit = (socket) => {
  let todaydate = new Date();
  let Hours = todaydate.getHours();
  let Minutes = todaydate.getMinutes();
  let Seconds = todaydate.getSeconds();
  let format = Hours >= 12 ? 'pm' : 'am';
  Hours = Hours % 12;
  Hours = Hours ? Hours : 12;
  Seconds = Seconds < 10 ? '0' + Seconds : Seconds;
  Minutes = Minutes < 10 ? '0' + Minutes : Minutes;
  const response = Hours + ':' + Minutes + ':' + Seconds + ' ' + format;
  socket.emit('GetTime', response);
};
