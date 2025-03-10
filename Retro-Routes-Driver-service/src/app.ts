import { Application } from "express";
import connectDB from "./config/mongo";
import RabbitMQClient from "./rabbitMq/client";
import express from "express";
import http from 'http'
import 'dotenv/config'

const PORT=process.env.PORT
class App{
    public app: Application;
    public server;
    constructor() {
      this.app=express()
      this.server=http.createServer(this.app)
      this.server.listen(PORT,()=>{    
        console.log(`server  http://localhost:${PORT}`);
        
      })
        RabbitMQClient.initialize();
        connectDB()        
    }
  
    
}

export default App