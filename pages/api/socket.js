import { Server } from 'socket.io';
// import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialized
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    // messageHandler(io, socket);

    console.log('is connected!!!');
    const createdMessage = () => {
      socket.broadcast.emit('newIncomingMessage', 'hi');
    };

    socket.on('createdMessage', createdMessage);
  };

  // Define actions inside
  io.on('connection', onConnection);

  console.log('Setting up socket');
  res.end();
}
