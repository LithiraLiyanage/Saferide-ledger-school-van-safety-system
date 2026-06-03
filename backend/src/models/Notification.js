import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, title:String, message:String, type:{type:String,enum:['pickup','drop','delay','emergency','report'],default:'report'}, relatedStudent:{type:mongoose.Schema.Types.ObjectId,ref:'Student'}, relatedAttendance:{type:mongoose.Schema.Types.ObjectId,ref:'Attendance'}, isRead:{type:Boolean,default:false} },{timestamps:true});
export default mongoose.model('Notification', schema);
