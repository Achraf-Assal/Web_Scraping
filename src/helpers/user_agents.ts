import { IntegerType } from "mongodb";
import { Model } from "mongoose";

export const header = ( customUserAgent:string ) => {
    const config = {
        headers: {
            'User-Agent': customUserAgent,
        }
    };
    return config;
}

export const getRandomInt = (min:number, max:number):number=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export const scrapRequast = async()=>{
    
  }

  export const getRandomUseragent = async(counter:number,User_agent:any,req:any,duration:number): Promise<string> => {
    const url = require('url')
    var userAgent:string = req.get('User-Agent').toString();
    const query = url.parse(req.url, true).query;    
    if (Boolean(query.use_agent)) {
        if (counter < duration) {
            counter++
        } else {
            counter = 0
            let lungth: number = await User_agent.collection.count();
            let user_agent_index: number = getRandomInt(0, lungth);
            let user_agent = await User_agent.find({ number: user_agent_index }); 
            userAgent = user_agent.agent
        }
     }
     return userAgent
  }
