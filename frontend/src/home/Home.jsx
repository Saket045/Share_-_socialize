/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MessageContainer from './components/MessageContainer';

const Home = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);

  };

  useEffect(() => {
    setIsSidebarVisible(!selectedUser); 
  }, [selectedUser]);

  return (
    <div className='flex flex-col md:flex-row justify-between min-w-full
      md:min-w-[550px] md:max-w-[65%] 
      p-4 h-[95%] md:h-full 
      rounded-lg shadow-lg 
      bg-clip-padding
      backdrop-filter backdrop-blur-lg 
      bg-opacity-80 transition-all duration-300'
    >
      <div className={` w-full py-2 h-full md:flex ${isSidebarVisible ? '' : 'hidden'}`}>
        <Sidebar onSelectUser={handleUserSelect} />
      </div>
  
      <div className={`divider divider-horizontal md:flex ${isSidebarVisible ? '' : 'hidden'} 
        ${selectedUser ? 'block' : 'hidden'} 
        border-l border-gray-300 mx-4`}
      ></div>
  
      <div className={`flex-auto transition-opacity duration-300 ${selectedUser ? '' : 'hidden md:flex'} bg-[#01010f] rounded-lg`}>
        <MessageContainer onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
  
};

export default Home;

