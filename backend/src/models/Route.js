import mongoose from 'mongoose';
const stop = new mongoose.Schema({ stopName:String, expectedTime:String, order:Number },{_id:false});
const schema = new mongoose.Schema({
  routeName:{type:String,required:true}, routeCode:{type:String,required:true,unique:true}, driver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  vehicleNumber:{type:String,required:true}, vehicleType:{type:String,default:'School Van'}, schoolName:{type:String,required:true}, startPoint:String, endPoint:String,
  pickupStartTime:String, schoolArrivalTime:String, schoolDepartureTime:String, dropEndTime:String, routeStops:[stop], status:{type:String,enum:['active','inactive'],default:'active'}
},{timestamps:true});
export default mongoose.model('Route', schema);
