/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:3000", {
        query: {
          userId: authUser?._id,
        }
      });
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });
      setSocketInstance(newSocket);
      return () => newSocket.close();
    } else {
      if (socketInstance) {
        socketInstance.close();
        setSocketInstance(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socketInstance, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
//createcontext as socketcontext

//consume the context in socketContext

//in socketContextProvider , in useEffect which changes with authUser import from useAuth
//if the authuser is available then:
//make the socket with query as authUserId and get the online users when getOnlineUsers event is
//listened from the server by socket.
//update the socket sate with socket made and close the socket made.
//if authUser is not there but socket socket state is filled then close the socket and nullify the state.

//wrap the app by socketContext.Provider and provide onlineUsers and socketState to the children

//IMPORTANT
//children: Represents the content between the opening and closing tags of the SocketContextProvider component.
//It’s how you nest components within the provider.