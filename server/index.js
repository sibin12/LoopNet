import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoutes.js' 
import videoRouter from './routes/videoRoutes.js'
import userRouter from './routes/userRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'

import {connect} from './config/db.js'
import cookieParser from 'cookie-parser'
// const authController = require('./controllers/authController')
// const adminController = require('./controllers/adminController')
const app = express();
dotenv.config();

//connect our db
connect();




//
app.use(cors({origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true}))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth' , authRouter)
app.use('/video',videoRouter)
app.use('/users',userRouter)
app.use("/comments", commentRouter);
app.use('/admin',adminRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)

app.use((err, req,res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success:false,
        status,
        message
    })
})

app.listen(process.env.PORT, ()=> console.log("server started"))
