import  mongoose  from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    //we will keep the sender id...
    //and this is obious..jo message send karne wala hoga..vo ek user hi hoga..

    receiverId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    message:{type:String, required: true}
})
export const Message = mongoose.model('Message',messageSchema);