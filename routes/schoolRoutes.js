const express = require("express");
const router = express.Router();

const {
    addSchool,
    listSchools
} = require("../controllers/schoolController");

const {
    validateSchool,
    validateSchoolQuery
} = require("../middlewares/validation");

router.get(
    "/listSchools",
    validateSchoolQuery,
    listSchools
);

router.post(
    "/addSchool",
    validateSchool,
    addSchool
);


module.exports = router;