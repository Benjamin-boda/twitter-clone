const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxLength: 12
    },
    passwordHash: {
        type: String,
        minlength: 4,
        maxLength: 16,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;