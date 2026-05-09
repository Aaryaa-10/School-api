
const { body, query, validationResult } = require("express-validator");

const validateSchool = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("School name is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("latitude")
        .isFloat()
        .withMessage("Valid latitude is required"),

    body("longitude")
        .isFloat()
        .withMessage("Valid longitude is required"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];

const validateSchoolQuery = [

    query("latitude")
        .notEmpty()
        .withMessage("Latitude is required")
        .isFloat()
        .withMessage("Latitude must be a valid number"),

    query("longitude")
        .notEmpty()
        .withMessage("Longitude is required")
        .isFloat()
        .withMessage("Longitude must be a valid number"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];


module.exports = {
    validateSchool,
    validateSchoolQuery
};