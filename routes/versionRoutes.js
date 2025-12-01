const express = require("express");
const { saveVersion, getVersions } = require("../controllers/versionController");

const router = express.Router();
//following requests
router.post("/save-version", saveVersion);
router.get("/versions", getVersions);

module.exports = router;