import express from 'express';
import Students from '../controllers/student.js';
const router = express.Router();



//add IsBlock after Auth 

router.post('/register', Students.register);
router.post('/sign_in', Students.sign_in);
router.post('/leaveApplication', Students.leaveApplication);
router.get('/leaveApplication/:studentId', Students.leaveApplicationById);
router.get('/checkInOut/:studentId', Students.checkInOut);
router.get('/monthSummary/:studentId', Students.monthSummary);




export default router;
