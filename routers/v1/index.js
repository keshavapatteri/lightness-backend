

import express from 'express';

import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
import cartRouter from './cartRouter.js'
import addressRouter from './addressRouter.js'
import adminRouter from './adminRouter.js'
import paymentRouter from './paymentRouter.js'

const v1Router = express.Router();


v1Router.use('/product',productRouter)
v1Router.use('/user',userRouter)
v1Router.use('/cart',cartRouter)
v1Router.use('/address',addressRouter)
v1Router.use('/admin',adminRouter)
v1Router.use('/payment',paymentRouter)



export default v1Router;
