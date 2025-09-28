import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},

    email:{type:String, required:true, unique:true},

    password:{type:String, required:true},

    profilePicture:{type:String, default:""},
   
    isPrivate:{type:Boolean, default:false}, //this means that the account is public by default

    bio:{type:String, default:""},

    gender:{type:String, enum:['male','female']},
    
   followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
//ye jo followers hai..wo user model ko hi refer kr rhe hai

//this mongoose.Schema.Types.ObjectId is used to create a reference to
// another document in a different collection

//this User is the name of the model we are referencing 

   following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],

   posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
   //we will create a schema of post..so the relation is with post model

   bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],


   
},{timestamps:true});
//timestamps:true -- this will automatically create the createdAt and updatedAt fields in the schema

export const User = mongoose.model("User", userSchema);

