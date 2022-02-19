const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
