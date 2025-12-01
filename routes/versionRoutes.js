// Router for version-related API endpoints
const express = require("express");
const router = express.Router();
const { saveVersion, getVersions } = require("../controllers/versionController");

// POST /api/save-version -- Save a new version
router.post("/save-version", saveVersion);

// GET /api/versions -- Fetch all saved versions
router.get("/versions", getVersions);

module.exports = router;