//UserData.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    color: {
        type: String
    },
    allDay: {
        type: Boolean
    },
    category: {
        type: String,
    }
});

const UserData = mongoose.model('UserData', dataSchema);

module.exports = UserData;