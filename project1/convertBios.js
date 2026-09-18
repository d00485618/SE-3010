const fs = require("fs");
const path = require("path");

// Root path to your heroes folder
const heroesDir = path.join(__dirname, "assets/images/heroes");

function convertTxtToJs(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into hero subdirectories
      convertTxtToJs(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const content = fs.readFileSync(fullPath, "utf-8");

      // Replace .txt extension with .js
      const jsPath = fullPath.replace(/\.txt$/, ".js");

      // Wrap raw text inside a CommonJS export
      const jsContent = `module.exports = ${JSON.stringify(content)};\n`;

      fs.writeFileSync(jsPath, jsContent, "utf-8");
      console.log(`Converted: ${entry.name} -> ${path.basename(jsPath)}`);

      // Delete the old .txt file
      fs.unlinkSync(fullPath);
    }
  }
}

console.log("Starting conversion...");
convertTxtToJs(heroesDir);
console.log("Conversion complete!");