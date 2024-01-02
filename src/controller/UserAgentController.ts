import User_agent from "../models/User_agent";
const mongo = require('mongodb');
export const Index = async (req : any,res : any)=>{
    try {
        const userAgents = await User_agent.find({isDeleted : false});
        if (userAgents.length > 0) {
            res.status(200).json({message: " user agent's has been load succasfuly ",
        "User Agents":userAgents
        })

        }else{
            res.status(401).json({message: " no agents found "})
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"})
    }
}
export const Show = async (req : any,res : any)=>{
    try {
        const id = req.params.id;
        const userAgent = await User_agent.find({_id:id,isDeleted : false});
        if (userAgent) {
            res.status(200).json({message: " user agent has been load succasfuly ",
        "User Agents":userAgent
        })
        }else{
            res.status(401).json({message: " no agent found "})
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"})
    }
}
export const Store = async (req : any,res : any)=>{
    try {
        const user_agent = new User_agent(req.body);
        let {agent} = user_agent;
        let agentExist  = await User_agent.findOne({agent});
        if (agentExist) {
            res.status(200).json({message: " user agent is alredy exist "})
        }else{
            let savedAgent = await user_agent.save();
        res.status(200).json({message: " user agent has been created ",
    "user agent":savedAgent})
        }

    } catch (error) {
         res.status(500).json({ error: "internal server error"});
    }
}

export const Delete = async (req:any,res:any)=>{

    try {
        const id = req.params.id;
        const userAgent = await User_agent.findById(id);
        if (userAgent) {
            await User_agent.findByIdAndDelete(id);
            res.status(200).json({message: ` user with the id: ${id} has been deleted `})
        }else{
            res.status(401).json({ error: `no user agent with the id : ${id}`});
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"});
    }
}
export const Update = async (req:any,res:any)=>{

    try {
        const id = req.params.id;
        const data = req.body;
        const userAgent = await User_agent.findById(id);
        if (userAgent) {
            const updatedAgent = await User_agent.findByIdAndUpdate(id ,data,{new:true});
            res.status(200).json({message: ` user with the id: ${id} has been updated ` ,
        Updated_user_agent: updatedAgent})
        }else{
            res.status(401).json({ error: `no user agent with the id : ${id}`});
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"});
    }
}

export const Search= async (req:any, res:any) => {
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        // const { page = 1, limit = 10 } = req.query;
        var page = 1 ;
        var limit = 3 ;
        const userAgents = await User_agent.find()
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 })

        // Getting the numbers of userAgents  stored in database
        const count = await User_agent.countDocuments();

        return res.status(200).json({
            userAgents ,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ error: "internal server error"});
    }
};
export const SoftDelete = async (req:any, res:any)=>{
    try {
        const id = req.params.id;
        let currentDate: Date = new Date();
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
        const data = {isDeleted : true,deletedAt:date}
        const userAgent = await User_agent.findById(id);
        if (userAgent) {
            const updatedAgent = await User_agent.findByIdAndUpdate(id ,data,{new:true});
            res.status(200).json({message: ` user with the id: ${id} has been deleted ` ,
        Updated_user_agent: updatedAgent})
        }else{
            res.status(401).json({ error: `no user agent with the id : ${id}`});
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"});
    }
}
export const Deleted = async (req:any, res:any)=>{
    try {
        const userAgents = await User_agent.find({isDeleted : true});
        if (userAgents.length > 0) {
            res.status(200).json({message: " deleted user agent's has been load succasfuly ",
        "User Agents":userAgents
        })

        }else{
            res.status(401).json({message: " no deleted agents found "})
        }

    } catch (error) {
        res.status(500).json({ error: "internal server error"})
    }
}