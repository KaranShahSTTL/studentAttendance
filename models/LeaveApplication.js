// create table leave_application(
//     id int primary key auto_increment,
//     student_id int,
//     leave_type varchar(255),
//     leave_from date,
//     leave_to date,
//     reason varchar(255),
//     status varchar(255),
//     created_at datetime default current_timestamp,
// );
//

// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
const Schema = mongoose.Schema

const LeaveApplicationSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    leaveFrom: {
        type: Date,
        required: true
    },
    leaveTo: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },  
    createdAt: {

        type: Date,
        default: Date.now
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        required: false
    },
    

}, {
    versionKey: false
})

const LeaveApplication = mongoose.model('LeaveApplication', LeaveApplicationSchema);
export default LeaveApplication


