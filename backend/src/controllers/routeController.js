import Route from '../models/Route.js'; import SafetyLog from '../models/SafetyLog.js';
export const createRoute=async(req,res)=>{ if(await Route.findOne({routeCode:req.body.routeCode})) return res.status(400).json({message:'Route code exists'}); const r=await Route.create(req.body); await SafetyLog.create({actor:req.user._id,action:'route_created',entityType:'Route',entityId:r._id,description:`${r.routeName} created`}); res.status(201).json(r); };
export const getRoutes=async(req,res)=>{ const q=req.user.role==='driver'?{driver:req.user._id}:{}; res.json(await Route.find(q).populate('driver','name email phone')); };
export const getRoute=async(req,res)=>res.json(await Route.findById(req.params.id).populate('driver','name email phone'));
export const updateRoute=async(req,res)=>res.json(await Route.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}));
export const deleteRoute=async(req,res)=>{await Route.findByIdAndDelete(req.params.id); res.json({message:'Route deleted'});};
