import express from 'express';
import {login,signup,logout} from '../controllers/auth.js'
const router = express.Router();

router.post('/singup',signup ) 
router.post('/login',login) 
router.post('/logout',logout) 


export default router; 