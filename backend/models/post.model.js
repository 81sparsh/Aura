import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    caption:{type:String, default:""},
    //instagram pr post upload karte waqt caption optional hota hai

    image:{type:String, required:true},
    //image is required..agr image nhi di to post nhi hoga

    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    //ye author field user model ko refer kr rha hai
    //jab post create karega..to batayege konse user ne create kara hai use

    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    //like krne wala user hi hoga 

    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
    //we will create another model of comment..so the relation is with comment model
    //basically comment me bhi proper ye hota hai kisne comment kiya...


   }, { timestamps: true })
   export const Post = mongoose.model("Post", postSchema);