const fs = require("fs");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const { getDiff } = require("../utils/diffUtil");

// Reading and writing to data.json 
let versions = [];

try {
    // Load existing versions if file has data
    const fileData = fs.readFileSync("data.json", "utf8");
    versions = fileData ? JSON.parse(fileData) : [];
} catch (err) {
    console.log("Could not read data.json, starting with empty array");
}

// POST /save-version function
exports.saveVersion = (req, res) => {
    const { text } = req.body;

    // If nothing to save
    if (!text || typeof text !== "string") {
        return res.status(400).json({ message: "Invalid text input" });
    }

    // Get previous version's text (fallback to empty string)
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

    // Push and save to text file
    versions.push(entry);
    fs.writeFileSync("data.json", JSON.stringify(versions, null, 4));

    return res.status(201).json({ message: "Version saved", entry });
};

// GET /versions
exports.getVersions = (req, res) => {
    return res.status(200).json(versions);
};