import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  fullName:{type:String,required:true}, studentCode:{type:String,required:true,unique:true}, grade:{type:String,required:true}, schoolName:{type:String,required:true},
  parent:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, route:{type:mongoose.Schema.Types.ObjectId,ref:'Route',required:true},
  pickupPoint:{type:String,required:true}, dropPoint:{type:String,required:true}, emergencyContactName:{type:String,required:true}, emergencyContactPhone:{type:String,required:true}, medicalNote:{type:String,default:''}, status:{type:String,enum:['active','inactive'],default:'active'}
},{timestamps:true});
export default mongoose.model('Student', schema);
