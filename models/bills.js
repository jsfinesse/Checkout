const mongoose = require("mongoose");

const billsSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        paymentMode: { type: String, required: true },
        cartItems: { type: Array, required: true },
    },
    { timestamps: true }
);

const Bills = mongoose.model("bills", billsSchema);

module.exports = Bills;
