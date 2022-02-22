const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

// Require DB connections and routes
require("./dbConnection");
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/usersRoute");

app.use("/api/items/", itemsRoute);
app.use("/api/users/", usersRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
