import User from '../models/User.js';
import { generateToken } from '../utils/token.js';
const safe=u=>({id:u._id,name:u.name,email:u.email,role:u.role,phone:u.phone,status:u.status,avatar:u.avatar});
export const register=async(req,res)=>{const {name,email,password,phone}=req.body; if(await User.findOne({email:email.toLowerCase()})) return res.status(400).json({message:'Email already exists'}); const role=email.toLowerCase()===(process.env.ADMIN_EMAIL||'admin@example.com').toLowerCase()?'admin':'parent'; const u=await User.create({name,email,password,phone,role}); res.status(201).json({token:generateToken(u._id),user:safe(u)});};
export const login=async(req,res)=>{const u=await User.findOne({email:req.body.email.toLowerCase()}); if(!u || !(await u.matchPassword(req.body.password))) return res.status(401).json({message:'Invalid email or password'}); if(u.status!=='active') return res.status(403).json({message:'Account disabled'}); res.json({token:generateToken(u._id),user:safe(u)});};
export const me=(req,res)=>res.json({user:safe(req.user)});
export const updateProfile=async(req,res)=>{const u=await User.findById(req.user._id); u.name=req.body.name||u.name; u.phone=req.body.phone||u.phone; await u.save(); res.json({user:safe(u)});};
export const changePassword=async(req,res)=>{const u=await User.findById(req.user._id); if(!(await u.matchPassword(req.body.currentPassword))) return res.status(400).json({message:'Current password incorrect'}); u.password=req.body.newPassword; await u.save(); res.json({message:'Password changed'});};
