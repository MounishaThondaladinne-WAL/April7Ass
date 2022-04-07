import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const API_ENDPOINT = 'http://localhost:3001';
function SocketDemo() {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(socketIOClient(API_ENDPOINT));
    const destructFunction = () => {
      console.log(socket);
      socket.disconnect();
      alert('component removed');
    };
    return destructFunction;
  }, []);
  useEffect(() => {
    connectSocketConnection(socket);
  }, [socket]);
  const connectSocketConnection = (socket) => {
    if (socket != null) {
      socket.on('GetTime', (data) => {
        setResponse(data);
        console.log(response);
      });
    }
  };
  const socketConnect = () => {
    setSocket(socketIOClient(API_ENDPOINT));
  };
  const socketDisconnect = () => {
    socket.disconnect();
  };
  return (
    <div>
      <h1>Socket</h1>
      <button onClick={socketConnect}> Connect </button>
      <button onClick={socketDisconnect}> Disconnect </button>
      <div className="time">
        Current Time: <time dateTime={response}>{response}</time>
      </div>
    </div>
  );
}
export default SocketDemo;
