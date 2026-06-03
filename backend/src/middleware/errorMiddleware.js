export const notFound=(req,res,next)=>{ res.status(404); next(new Error(`Route not found: ${req.originalUrl}`)); };
export const errorHandler=(err,req,res,next)=>{ res.status(res.statusCode===200?500:res.statusCode).json({message:err.message||'Server error'}); };
