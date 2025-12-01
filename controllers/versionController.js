const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const { getDiff } = require("../utils/diffUtil");

// In-memory storage 
let versions = [];

// POST /save-version function to save the audits
exports.saveVersion = (req, res) => {
    const { text } = req.body;

    // If nothing to save
    if (!text || typeof text !== "string") {
        return res.status(400).json({ message: "Invalid text input" });
    }

    // Get previous version's text (fallback to empty string to prevent crashing)
    const oldText = versions.length > 0 ? versions[versions.length - 1].fullText : "";

    // Generate diff information
    const diff = getDiff(oldText, text);

    // Create a version entry
    const entry = {
        id: uuidv4(),
        timestamp: dayjs().format("YYYY-MM-DD HH:mm"),
        addedWords: diff.added,
        removedWords: diff.removed,
        oldLength: oldText.split(/\s+/).filter(Boolean).length,
        newLength: text.split(/\s+/).filter(Boolean).length,
        fullText: text     // stored to compute next version
    };

    // Push to in-memory array
    versions.push(entry);

    return res.status(201).json({ message: "Version saved", entry });
};

// GET /versions for getting all the audits and displaying
exports.getVersions = (req, res) => {
    return res.status(200).json(versions);
};

// To clear all audits
exports.resetVersions = (req, res) => {
    versions.length = 0; // Clears array safely
    return res.status(200).json({ message: "All versions cleared!" });
};