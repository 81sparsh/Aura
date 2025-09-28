import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
    //conversation me participants involve hote hai
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        //now it can have one or multiple users..so we just create array
    }],
    //participants se ye hoga ki example k liye 2 user hai..to unke bich k saare message ki
    //list chahiye mujhe 

    messages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Message'
        //
    }]

})
export const Conversation = mongoose.model('Conversation', conversationSchema);