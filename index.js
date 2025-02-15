require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./utils/db");
const cors = require("cors");
const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "2048mb" }));
app.use(express.static(__dirname + "/public"));
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL, process.env.PRODUCTION_FRONTEND_URL],
    })
);

app.get("/", (req, res) => {
    res.send('Hello, world!');
});

app.use("/", require("./routes/index"));

db.on("error", console.error.bind(console, "Connection error of DB :- "));
db.once("open", (error) => {
    if (error) throw Error();
    console.log("Connection is established with DB...!");
    if (!app.listening) {
        app.listen(PORT, () =>
            console.log(`habiTribe app listening on port http://localhost:${PORT}`)
        );
    }
});