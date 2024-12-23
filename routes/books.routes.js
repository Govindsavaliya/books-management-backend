const router = require("express").Router();

const { getBooksAction, addBookAction } = require("../controllers/bookController");
const { validateBook, validateInput } = require("../middleware/validate");

router.get("/", getBooksAction)
router.post("/", validateBook, validateInput, addBookAction)

module.exports = router;