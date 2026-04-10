const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let alerts = [];

app.post("/alert", (req, res) => {
    const alert = {
        type: req.body.type,
        location: req.body.location,
        time: new Date().toLocaleTimeString()
    };

    alerts.push(alert);
    console.log("🚨", alert);

    res.json({ message: "ok" });
});

app.get("/alerts", (req, res) => {
    res.json(alerts);
});

app.listen(5000, () => console.log("Server running"));