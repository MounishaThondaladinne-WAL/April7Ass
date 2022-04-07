import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const API_ENDPOINT = "http://localhost:3001";
function SocketDemo() {
  const [response, setResponse] = useState("");
  //we  have created a variable called socket which holds the socket connectino returned
  //from socketIOClient function
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    /*const socket = socketIOClient(API_ENDPOINT);*/
    setSocket(socketIOClient(API_ENDPOINT));
    const destructFunction = () => {
      console.log(socket);
      socket.disconnect();
      alert("component removed");
    };
    return destructFunction;
  }, []);
  useEffect(() => {
    //when the socket variable changes, we call the function connectSocketConnection.
    connectSocketConnection(socket);
  }, [socket]);
  const connectSocketConnection = (socket) => {
    if (socket != null) {
      socket.on("GetTime", (data) => {
        setResponse(data);
        console.log(response);
      });
    }
  };
  const socketConnect = () => {
    setSocket(socketIOClient(API_ENDPOINT));
  };
  //disconnect the socket
  const socketDisconnect = () => {
    socket.disconnect();
  };
  return (
    <div>
      <button onClick={socketConnect}> Connect </button>
      <button onClick={socketDisconnect}> Disconnect </button>
      It's <time dateTime={response}>{response}</time>
    </div>
  );
}
export default SocketDemo;
