import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const protect = async (req,res,next)=>{ try{ const h=req.headers.authorization||''; const token=h.startsWith('Bearer ')?h.split(' ')[1]:null; if(!token) return res.status(401).json({message:'Token missing'}); const d=jwt.verify(token,process.env.JWT_SECRET||'change_this_secret'); req.user=await User.findById(d.id).select('-password'); if(!req.user || req.user.status!=='active') return res.status(401).json({message:'User inactive or not found'}); next(); }catch{ res.status(401).json({message:'Invalid token'}); } };
export const roleOnly = (...roles)=>(req,res,next)=> roles.includes(req.user?.role)?next():res.status(403).json({message:'Access denied'});
