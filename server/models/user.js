const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    investments: [
        {
            sum: { type: Number, required: true },
            status: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ],
});

module.exports = mongoose.model('User', userSchema);
