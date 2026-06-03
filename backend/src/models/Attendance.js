import mongoose from 'mongoose';
import { computeOverallStatus } from '../utils/constants.js';
const schema = new mongoose.Schema({
  student:{type:mongoose.Schema.Types.ObjectId,ref:'Student',required:true}, parent:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, driver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, route:{type:mongoose.Schema.Types.ObjectId,ref:'Route',required:true}, date:{type:String,required:true},
  pickupStatus:{type:String,enum:['pending','picked_up','absent','missed'],default:'pending'}, pickupTime:Date, pickupNote:{type:String,default:''}, schoolArrivalStatus:{type:String,enum:['pending','arrived','delayed'],default:'pending'}, schoolArrivalTime:Date,
  departureStatus:{type:String,enum:['pending','departed'],default:'pending'}, departureTime:Date, dropStatus:{type:String,enum:['pending','dropped','missed'],default:'pending'}, dropTime:Date, dropNote:{type:String,default:''},
  overallStatus:{type:String,enum:['in_transit','at_school','dropped_home','absent','issue_reported'],default:'in_transit'}, proofMethod:{type:String,enum:['manual','qr_demo','location_demo'],default:'manual'}
},{timestamps:true});
schema.index({student:1,date:1},{unique:true});
schema.pre('save',function(next){ this.overallStatus=computeOverallStatus(this); next(); });
export default mongoose.model('Attendance', schema);
