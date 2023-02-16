// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const AttendanceSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
    },
    CheckInTime:{
        type: Date,
        default: Date.now
    },
    CheckOutTime:{
        type: Date,
        default: Date.now
    },
    Flag:{
        type: Boolean,
        default: false
    },


}, {
    versionKey: false
})

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance


