import express from 'express';
import Students from '../controllers/student.js';
const router = express.Router();



//add IsBlock after Auth 

router.post('/register', Students.register);
router.post('/sign_in', Students.sign_in);
router.get('/checkInOut/:studentId', Students.checkInOut);




export default router;
