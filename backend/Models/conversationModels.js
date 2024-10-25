import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema)

export default Conversation;
//The complete model summary
//User made with its attributes

//Message will contain sender id which refers to user model
//Message will contain receiver id which refers to user model
//Message will be there
//Conversation id will be there

//Conversation will have two users ids in its participants array
//messages array will also be there