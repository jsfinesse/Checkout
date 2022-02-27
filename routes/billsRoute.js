const express = require("express");
const router = express.Router();

const Bill = require("../models/bills");

router.post("/charge-bill", async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
