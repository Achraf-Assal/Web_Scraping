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
    },
    isDeleted: {
        type: Boolean
    },
    deletedAt: {
        type: Date
    }
})


// const User_agents =  mongoose.model("Chicken", User_agent_schema);

// module.exports = { User_agents }
export default mongoose.model("User_agents" , User_agent_schema)