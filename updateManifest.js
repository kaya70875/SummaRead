const fs = require("fs");
const path = require("path");
const allowedUrls = require("./allowedUrls.js");

// Load the existing manifest.json
const manifestPath = path.join(__dirname, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Update host_permissions and content_scripts
manifest.host_permissions = allowedUrls;
manifest.content_scripts[0].matches = allowedUrls;

// Write the updated manifest back to the file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
