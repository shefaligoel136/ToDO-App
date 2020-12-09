const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date
    }
});

const Tasks = mongoose.model('Tasks',taskSchema);

module.exports = Tasks;