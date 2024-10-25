import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
    const {setAuthUser} = useAuth();
    const [loading , setLoading] = useState(false);
    const [inputData , setInputData] = useState({})

    const handelInput=(e)=>{
        setInputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }
console.log(inputData);
    const selectGender=(selectGender)=>{
        setInputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }

    const handelSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const register = await axios.post(`/api/auth/register`,inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false)
                toast.error(data.message)
                console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('chatapp',JSON.stringify(data))
            setAuthUser(data)
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='flex items-center justify-center '>
            <div className='w-full max-w-xl p-8 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Register <span className='text-blue-600'>Chatters</span>
                </h1>
                <form onSubmit={handelSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Full Name:</label>
                        <input
                            id='fullname'
                            type='text'
                            onChange={handelInput}
                            placeholder='Enter Full Name'
                            required
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Username:</label>
                        <input
                            id='username'
                            type='text'
                            onChange={handelInput}
                            placeholder='Enter Username'
                            required
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Email:</label>
                        <input
                            id='email'
                            type='email'
                            onChange={handelInput}
                            placeholder='Enter Email'
                            required
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Password:</label>
                        <input
                            id='password'
                            type='password'
                            onChange={handelInput}
                            placeholder='Enter Password'
                            required
                            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                value='male'
                                onChange={() => selectGender('male')}
                                checked={inputData.gender === 'male'}
                                className='mr-2'
                            />
                            <span className='text-gray-700 font-semibold'>Male</span>
                        </label>
                        <label className='flex items-center'>
                            <input
                                type='radio'
                                value='female'
                                onChange={() => selectGender('female')}
                                checked={inputData.gender === 'female'}
                                className='mr-2'
                            />
                            <span className='text-gray-700 font-semibold'>Female</span>
                        </label>
                    </div>

                    <button
                        type='submit'
                        className='w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200'
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>

                <div className='pt-4 text-center'>
                    <p className='text-sm font-semibold text-gray-700'>
                        Don't have an account? 
                        <Link to={'/login'} className='text-blue-600 font-bold underline ml-1'>
                            Login Now!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register