const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    //     name: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     email: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     password: {
    //         type: String,
    //         required: true
    //     },
    //     role: {
    //         type: Number,
    //         default: 0
    //     },
    //     cart: {
    //         type: Array,
    //         default: []
    //     }
    // }, {
    //     timestamps: true
    // })

    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    aadhaar: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)