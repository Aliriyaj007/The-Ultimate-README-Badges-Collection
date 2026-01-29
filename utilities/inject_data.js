const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, '../index.html');
const dataFile = path.join(__dirname, '../badge_data_output.js');

let indexContent = fs.readFileSync(indexFile, 'utf8');
let dataContent = fs.readFileSync(dataFile, 'utf8');

// Markers
const startMarker = 'const badgeData = [';
const logicMarker = '// --- App Logic ---';

const startIndex = indexContent.indexOf(startMarker);
const logicIndex = indexContent.indexOf(logicMarker);

if (startIndex === -1 || logicIndex === -1) {
    console.error('Could not find markers in index.html');
    console.log('Start index:', startIndex);
    console.log('Logic index:', logicIndex);
    process.exit(1);
}

// We want to replace everything from `const badgeData = [` down to just before `// --- App Logic ---`
// The generated dataContent is `const badgeData = [...];`

// Extract the part before
const preContent = indexContent.substring(0, startIndex);

// Extract the part after (starting from Logic marker)
const postContent = indexContent.substring(logicIndex);

// Construct new file
// Ensure clean spacing
const newContent = preContent + dataContent + '\n\n        ' + postContent;

fs.writeFileSync(indexFile, newContent);
console.log(`Successfully injected ${dataContent.length} bytes of badge data into index.html`);
