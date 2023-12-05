import mongoose , {mongo} from "mongoose";

const User_agent_schema = new mongoose.Schema({
    agent :
    {
        type : String,
        require:true
    },
    number : {
        type : Number,
        require : true
    }
})

export default mongoose.model("User_agents" , User_agent_schema)