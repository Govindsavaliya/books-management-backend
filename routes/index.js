const express = require("express");
const router = express.Router();

router.use("/books", require("./books.routes.js"));
router.use("/", require("./users.routes.js"));

module.exports = router;
