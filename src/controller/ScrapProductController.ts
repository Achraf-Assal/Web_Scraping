import User_agent from "../models/User_agent";
import { getRandomUseragent, header } from "../helpers/user_agents";
import { SuccasHandler, ErrorHandler } from "../handlers/ResponsHandler";
import { GetProductImg } from "../helpers/scrap_functions";
const axios = require('axios')

const mongo = require('mongodb');
var use_agent: boolean = true;
var counter: number = 0;
const url = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1313&_nkw=ardoino&_sacat=0';

export const Index = async (req: any, res: any) => {
    try {
        let user_Agent:string = "";
        getRandomUseragent(counter, User_agent, req, 3)
            .then((result: string) => {
                user_Agent = result;
            })
            .catch((error) => {
                console.error('Error:', error);
            }); 
        let config = header(user_Agent);
        const response = await axios.get(url, config);
        let imgUrls = await GetProductImg(response);
        console.log(imgUrls);
        let succasMSG = {message: "data hase benn load",
             "image urls":imgUrls};
            SuccasHandler(succasMSG,200,res);
        
    } catch (error:any) {
        ErrorHandler({ 
            message: "Scraping failed",
            error: error.error.message || "An unexpected error occurred"
        },500,res);
    }
}