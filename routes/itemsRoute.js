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

router.post("/add-item", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

router.post("/edit-item", async (req, res) => {
    try {
        await Item.findOneAndUpdate({ _id: req.body.itemId }, req.body);
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

router.post("/delete-item", async (req, res) => {
    try {
        await Item.findOneAndDelete({ _id: req.body.itemId });
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
