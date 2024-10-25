import express from 'express'
import isLogin from '../middleware/isLogin.js'
import { getCorrentChatters, getUserBySearch,getAllUsers } from '../routControlers/userhandlerControler.js'
const router = express.Router()

router.get('/search',isLogin,getUserBySearch);

router.get('/currentchatters',isLogin,getCorrentChatters)

router.get('/allChatters',isLogin,getAllUsers)

export default router