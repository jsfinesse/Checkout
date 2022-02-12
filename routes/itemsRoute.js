const express = require("express");
const router = express.Router();

const Item = require("../models/items");

router.get("/get-all-items", async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
