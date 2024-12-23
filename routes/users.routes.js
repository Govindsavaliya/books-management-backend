const { registerUserAction, loginUserAction, getUserInfoAction } = require("../controllers/userController");
const userAuth = require("../middleware/check.user.auth");
const { validateUser, validateInput } = require("../middleware/validate");

const router = require("express").Router();

router.post("/register", validateUser, validateInput, registerUserAction)
router.post("/login", validateUser, validateInput, loginUserAction)
router.get("/user-info", userAuth, getUserInfoAction)

module.exports = router;