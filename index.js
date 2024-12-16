const express=require('express')
const app=express()

const maxlimit=100;
const timelimit=15*60*1000;
const map=new Map();
app.use((req,res,next)=>{
    const ip=req.ip;
    console.log(req.ip);
    const now=Date.now();
    if(!map.has(ip)){
        map.set(ip,[]);
    }
    const timestamps=map.get(ip);
    while(timestamps.length>0 && now-timestamps[0]>timelimit){
        timestamps.shift();
    }
    if(timestamps.length>maxlimit){
        res.send({
            success:false,
            message:"too many requests"});
    }
    timestamps.push(now);
    next();
})
app.get('/',(req,res)=>{
    res.send('welcome to rate limiter api')
})
const PORT=3000;
app.listen(PORT,(req,res)=>{
    console.log("server listening on port 3000");
})