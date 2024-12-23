const { body, validationResult } = require("express-validator");

// Book Validation
const validateBook = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
    body("author")
        .notEmpty()
        .withMessage("Author is required")
        .isLength({ max: 50 })
        .withMessage("Author cannot exceed 50 characters"),
];

// User Validation
const validateUser = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

// Validation Result Middleware (common for both)
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateBook, validateUser, validateInput };
