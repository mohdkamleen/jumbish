const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    profile: {
        phone: Number
    },
    address: {
        name: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        pincode: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        slot: {
            type: String,
            default: ""
        },
        tip: {
            type: Number,
            default: ""
        }
    },
    cart: [],
    order: []
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema);