// Simple word-based diff function.
// This is intentionally lightweight
exports.getDiff = (oldText, newText) => {
    // Convert text to word arrays
    const oldWords = oldText.split(/\s+/).filter(Boolean);
    const newWords = newText.split(/\s+/).filter(Boolean);

    // Find newly added words
    const added = newWords.filter(word => !oldWords.includes(word));

    // Find removed words
    const removed = oldWords.filter(word => !newWords.includes(word));

    return { added, removed };
};