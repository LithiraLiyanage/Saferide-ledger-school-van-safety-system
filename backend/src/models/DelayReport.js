import mongoose from 'mongoose';
const schema = new mongoose.Schema({ driver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, route:{type:mongoose.Schema.Types.ObjectId,ref:'Route',required:true}, date:String, delayType:{type:String,enum:['traffic','vehicle_issue','weather','student_delay','other'],required:true}, estimatedDelayMinutes:{type:Number,min:1,max:240,required:true}, message:{type:String,required:true,maxlength:300}, status:{type:String,enum:['active','resolved'],default:'active'} },{timestamps:true});
export default mongoose.model('DelayReport', schema);
