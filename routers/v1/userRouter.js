import express from 'express'
import {  registerUser, UserLogin, UserLogout, UserProfile } from '../../contollers/userController.js';
import { authUser } from '../../middleWare/authUser.js';

const router = express.Router()
//create
router.post('/create', registerUser);
//user login
router.post('/login', UserLogin);
//user profile
router.get('/profile',authUser,UserProfile)
router.post('/logout',UserLogout);


export default router;