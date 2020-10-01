const mongoose = require('mongoose') 

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    amount: {
        type: String,
        required: true
    },
    cardType: {
        type: String
    },
    cardnum: {
        type: String
    },
    PG_TYPE: {
        type: String
    },
    PaymentMode: {
        type: String,
        required: true
    },
    bank_ref_num: {
        type: String
    },
    name_on_card: {
        type: String
    },
    net_amount_debit: {
        type: String
    },
    txnid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payment", paymentSchema)