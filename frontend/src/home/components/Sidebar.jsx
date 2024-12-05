/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BiLogOut } from "react-icons/bi";
import userConversation from '../../Zustan/userConversation';
import { useSocketContext } from '../../context/SocketContext';

const Sidebar = ({ onSelectUser }) => {

    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();
    const { socket, onlineUser } = useSocketContext();
    const [allChatters,setAllChatters] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchuser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUserId, setSetSelectedUserId] = useState(null);
    const { message , selectedConversation, setSelectedConversation } = userConversation();
    const [newMessageUsers, setNewMessageUsers] = useState('');

    const talkedwith = chatUser.map((user) => (user._id));

    const isOnline = talkedwith.map(userId => onlineUser.includes(userId))
    console.log(isOnline);
    //show user with u chatted
    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true)
            try {
                const chatters = await axios.get(`/api/user/currentchatters`)
                const data = chatters.data;
                if (data.success === false) {
                    setLoading(false)
                    console.log(data.message);
                }
                setLoading(false)
                setChatUser(data)

            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        chatUserHandler()
    }, [])
    console.log(selectedConversation);

    //show user from the search result
    const handelSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const search = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = search.data;
            if (data.success === false) {
                setLoading(false)
                console.log(data.message);
            }
            setLoading(false)
            if (data.length === 0) {
                toast.info("User Not Found")
            } else {
                // const mainData=data.filter((user)=>user._id!==authUser._id)
                setSearchuser(data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    //show which user is selected
    const handelUserClick = (user) => {
        onSelectUser(user)
        setSetSelectedUserId(user._id)
        setSelectedConversation(user)
    }

    //back from search result
    const handSearchback = () => {
        setSearchuser([]);
        setSearchInput('')
    }

    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
            setNewMessageUsers(newMessage)
        })
        return ()=> socket?.off("newMessage")
    },[socket,message])

    //logout
    const handelLogOut = async () => {
       
            try {
                const logout = await axios.post('/api/auth/logout')
                const data = logout.data;
                if (data?.success === false) {
                    setLoading(false)
                    console.log(data?.message);
                }
                toast.info(data?.message)
                localStorage.removeItem('token')
                setAuthUser(null)
                setLoading(false)
                navigate('/login')
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        } 

    return (
        <div className='h-full w-auto px-1'>
            <div className='flex justify-between gap-2'>
                <form onSubmit={handelSearchSubmit} className='w-auto flex items-center justify-between bg-white rounded-full '>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        className='px-4 w-auto bg-transparent outline-none rounded-full'
                        placeholder='search user'
                    />
                    <button className='btn btn-circle bg-sky-700 hover:bg-gray-950'>
                        <FaSearch />
                    </button>
                </form>
            </div>
            <div className='divider px-3'></div>
            {searchUser?.length > 0 ? (
                <>
                    <div className="min-h-[70%] max-h-[80%] border-t border-gray-600 overflow-y-auto scrollbar py-4 ">
                        <div className='w-auto'>
                            {searchUser.map((user, index) => (
                                <div key={user._id}>
                                    <div
                                        onClick={() => handelUserClick(user)}
                                        className={`flex gap-3 
                                                items-center rounded 
                                                px-2 cursor-pointer
                                               `}>
                                        {/*Socket is Online*/}
                                        <div className={`avatar `}>
                                            <div className="w-12 rounded-full">
                                                <img src={user.profilepic} alt='user.img' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <p className='font-bold  text-white'>{user.username}</p>
                                        </div>
                                    </div>
                                    <div className='divider divide-solid px-3 h-[1px]'></div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                    <div className='mt-auto px-1 flex '>
                        <button onClick={handSearchback} className='bg-white rounded-full px-2 py-1  self-center'>
                            <IoArrowBackSharp size={25} />
                        </button>

                    </div>
                </>
            ) : (
                <>
    <div className="max-h-[90%] overflow-y-auto scrollbar">
        <div className='w-auto'>
            
            {chatUser.map((user, index) => (
                <div key={user._id}>
                    <div
                        onClick={() => handelUserClick(user)}
                        className={`flex gap-3 
                        items-center rounded 
                        p-2 py-1 cursor-pointer
                        ${selectedUserId === user?._id ? 'bg-sky-500' : ''}`}>
                        
                        {/* Socket is Online */}
                        <div className={`avatar ${isOnline[index] ? 'online' : 'offline'}`}>
                            <div className="w-12 rounded-full">
                                <img src={user.profilepic} alt='user.img' />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <p className='font-bold text-white'>{user.username}</p>
                        </div>

                        <div>
                            {selectedConversation === null && 
                            newMessageUsers.reciverId === authUser._id &&  
                            newMessageUsers.senderId === user._id ? 
                            <div className="rounded-full bg-green-700 text-sm text-white px-[4px]">+1</div>
                            : null}
                        </div>
                    </div>
                    <div className='divider divide-solid px-3 h-[1px]'></div>
                </div>
            ))}
        </div>
    </div>
    <div className='mt-auto px-1 py-1 flex'>
        <button onClick={handelLogOut} className='text-white w-10 cursor-pointer rounded-lg ' >
            <BiLogOut size={25} />
        </button>
        <p className='text-md py-1 text-white'>@{authUser.username}</p>
    </div>
</>
            )}
        </div>
    )
}

export default Sidebar