/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login = () => {

    const navigate = useNavigate();
    const {setAuthUser} = useAuth();

    const [userInput, setUserInput] = useState({});
    const [loading, setLoading] = useState(false)

    const handleInput = (e) => {
        setUserInput({
            ...userInput, [e.target.id]: e.target.value
        })
    }
    console.log(userInput);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const login = await axios.post(`/api/auth/login`, userInput);
            const data = login.data;
            if (data.success === false) {
                setLoading(false)
                console.log(data.message);
            }
            toast.success(data.message)
            localStorage.setItem('token',JSON.stringify(data));
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
            <div className='w-full max-w-lg p-8 bg-white rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
                    Login 
                </h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Email:</label>
                        <input
                            id='email'
                            type='email'
                            onChange={handleInput}
                            placeholder='Enter your email'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 font-semibold mb-1'>Password:</label>
                        <input
                            id='password'
                            type='password'
                            onChange={handleInput}
                            placeholder='Enter your password'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200'
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <div className='pt-4 text-center'>
                    <p className='text-sm font-semibold text-gray-700'>
                        Don't have an account? 
                        <Link to={'/register'} className='text-blue-600 font-bold underline ml-1'>
                            Register Now!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login

