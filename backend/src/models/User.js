import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const schema = new mongoose.Schema({
  name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true}, role:{type:String,enum:['parent','driver','admin'],default:'parent'},
  phone:{type:String,default:''}, status:{type:String,enum:['active','disabled'],default:'active'}, avatar:{type:String,default:''}
},{timestamps:true});
schema.pre('save', async function(next){ if(!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password,10); next(); });
schema.methods.matchPassword = function(p){ return bcrypt.compare(p,this.password); };
export default mongoose.model('User', schema);
