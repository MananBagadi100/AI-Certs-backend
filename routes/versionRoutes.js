// Router for version-related API endpoints
const express = require("express");
const router = express.Router();
const { saveVersion, getVersions } = require("../controllers/versionController");
const { resetVersions } = require("../controllers/versionController");

// POST /api/save-version -- Save a new version
router.post("/save-version", saveVersion);

// GET /api/versions -- Fetch all saved versions
router.get("/versions", getVersions);

// To delete all the audits and make the app fresh
router.delete("/reset", resetVersions);

module.exports = router;