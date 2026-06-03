import express from 'express'; import {dailyReport,studentAttendance,routeAttendance} from '../controllers/attendanceController.js'; import {protect} from '../middleware/authMiddleware.js';
const r=express.Router(); r.get('/daily-attendance',protect,dailyReport); r.get('/route/:routeId',protect,routeAttendance); r.get('/student/:studentId',protect,studentAttendance); export default r;
