import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.routes.js"
import messageRoute from "./routes/message.routes.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js"
import path from 'path'

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4001', // Allow this specific origin
    credentials: true, // Allow cookies and other credentials
  }));
app.use(cookieParser());

const port = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("MongoDB Connected");
    
} catch (error) {
    console.log(error);  
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


//------------------- code for deployment ----------------

if (process.env.NODE_ENV === 'production') {
    const dirPath = path.resolve();
    app.use(express.static("./frontend_chat_app/dist"));
    app.get('*', (req, res) => {
        res.sendFile(path.join(dirPath, './frontend_chat_app/dist', 'index.html'))
    })
}

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})