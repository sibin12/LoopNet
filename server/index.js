import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/auth.js' 
import videoRouter from './routes/video.js'
import userRouter from './routes/user.js'
import commentRouter from './routes/comment.js'
import adminRouter from './routes/admin.js'
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
