const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    studentsSubmitted: {
        type: Array,
    },
    subjects:{
        type: String,
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    dateEnded:{
        type: Date,
    }
}
);

const Assignment = mongoose.model('assignment', AssignmentSchema);

module.exports = Assignment;