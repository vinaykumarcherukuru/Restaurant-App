const mongoose = require('mongoose') 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema)