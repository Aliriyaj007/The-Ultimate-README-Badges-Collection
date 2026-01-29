const fs = require('fs');
const path = require('path');

const categoriesDir = path.join(__dirname, '../Categories');
const outputFile = path.join(__dirname, '../badge_data_output.js');

const categoryFiles = fs.readdirSync(categoriesDir).filter(file => file.endsWith('.md'));

const badgeData = [];

categoryFiles.forEach(file => {
    const filePath = path.join(categoriesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract Category Name (First H1)
    const titleMatch = content.match(/^# (.*)/m);
    let categoryName = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');

    // Clean up title (remove emoji if needed, but current index.html uses emojis)
    // Remove " (150+ Badges)" suffix if present
    categoryName = categoryName.replace(/\s*\(\d+\+ Badges\)/, '').trim();

    const badges = [];

    // Split by Service sections (## Service Name)
    const sections = content.split(/^## /m).slice(1); // Skip preamble

    sections.forEach(section => {
        // Extract Service Name
        const lines = section.split('\n');
        const serviceName = lines[0].trim();

        // Find the first markdown image: ![Alt](URL)
        const badgeMatch = section.match(/!\[.*?\]\((.*?)\)/);

        if (badgeMatch) {
            let url = badgeMatch[1];
            // Clean up the URL (remove existing style params if we want clean state, 
            // but for index.html visualization it's good to keep the default)

            badges.push({
                name: serviceName,
                url: url
            });
        }
    });

    if (badges.length > 0) {
        badgeData.push({
            category: categoryName,
            badges: badges
        });
    }
});

const outputContent = `const badgeData = ${JSON.stringify(badgeData, null, 4)};`;
fs.writeFileSync(outputFile, outputContent);

console.log(`Generated data for ${badgeData.length} categories.`);
console.log(`Output saved to ${outputFile}`);
