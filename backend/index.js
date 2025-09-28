import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';

import { app, server, io } from "./socket/socket.js";

import userRoute from "./Routes/user.route.js";
import postRoute from "./Routes/post.route.js";
import messageRoute from "./Routes/message.route.js";
import path from 'path';

import dotenv from 'dotenv';


dotenv.config();
//this will allow us to use the environment variables from the .env file

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

console.log(__dirname);

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"server is running"
    })
});




app.use(express.json());

app.use(cookieParser());
//whenever we try to request the token from browser..then we will store the token in the cookie parser

app.use(urlencoded({extended:true}));
//basically this will allow us to parse the incoming requests with urlencoded payloads
//this app.use(urlenconded) --
//this thing will allow the read of data which are sended in browser through post request
//extended:true -- this will allow us to parse nested objects


app.use(express.static(path.join(__dirname,'./frontend/dist')));

//CORS - cross origin resource sharing
const corsOptions = {
    origin: "http://localhost:5173", // this 5173 is the port where our frontend is running(vite)
  
    credentials: true, // cookie send hogi agr hm credentails true krdenge
//credentials: true allows cookies and authentication headers 
// to be sent and received between frontend and backend.

  };


  app.use(cors(corsOptions));
  //this will allow the cross origin resource sharing
  //frontend and backend can communicate with each other
  
/*
means that all routes defined in userRoute will be accessible under the path /api/v1/user. For example, 
if userRoute has a route for /login, it will be available at /api/v1/user/login. 
This helps organize your API endpoints and version them cleanly.
*/

app.use("/api/v1/user",userRoute);


app.use("/api/v1/post",postRoute);

app.use("/api/v1/message",messageRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

  // Catch-all for SPA
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })}).catch((error)=>{
        console.log("Failed to connect to database",error);
    });
// app.listen(PORT,()=>{
//     connectDB();
//     console.log(`server is running on port ${PORT}`);
// })
