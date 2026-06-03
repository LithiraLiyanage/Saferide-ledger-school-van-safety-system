import { validationResult } from 'express-validator';
export const validate=(req,res,next)=>{ const e=validationResult(req); if(!e.isEmpty()) return res.status(400).json({message:'Validation failed',errors:e.array().map(x=>x.msg)}); next(); };
