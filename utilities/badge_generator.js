const fs = require('fs');
const path = require('path');

// --- Helper Functions ---

function generateBadge(label, message, color, style, logo, logoColor) {
    let url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style}`;
    if (logo) url += `&logo=${logo}`;
    if (logoColor) url += `&logoColor=${logoColor}`;
    return url;
}

function generateSection(service) {
    let md = `## ${service.name}\n\n`;

    // 1. Styles Matrix
    md += `**Styles**\n\n`;
    md += `| Style | Preview | Markdown |\n`;
    md += `| :--- | :--- | :--- |\n`;

    const styles = ['flat', 'flat-square', 'for-the-badge', 'plastic', 'social'];
    styles.forEach(style => {
        const url = generateBadge(service.label, service.message, service.color, style, service.logo, service.logoColor);
        md += `| ${style} | ![${service.name}](${url}) | \`![${service.name}](${url})\` |\n`;
    });

    // 2. Status Variations
    md += `\n**Status Variations**\n\n`;
    md += `| Status | Preview | Markdown |\n`;
    md += `| :--- | :--- | :--- |\n`;

    const statuses = [
        { msg: 'passing', col: 'success' },
        { msg: 'failing', col: 'critical' },
        { msg: 'building', col: 'yellow' },
        { msg: 'deployed', col: 'blue' }
    ];

    statuses.forEach(stat => {
        const url = generateBadge(service.label, stat.msg, stat.col, 'flat', service.logo, service.logoColor);
        md += `| ${stat.msg} | ![${service.name} ${stat.msg}](${url}) | \`![${service.name} ${stat.msg}](${url})\` |\n`;
    });

    md += '\n---\n\n';
    return md;
}

// --- Data ---
const services = [
    { name: 'MERN Stack', label: 'MERN', message: 'Stack', color: '61DAFB', logo: 'react', logoColor: 'black' },
    { name: 'MEAN Stack', label: 'MEAN', message: 'Stack', color: 'DD0031', logo: 'angular', logoColor: 'white' },
    { name: 'MEVN Stack', label: 'MEVN', message: 'Stack', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
    { name: 'PERN Stack', label: 'PERN', message: 'Stack', color: '336791', logo: 'postgresql', logoColor: 'white' },
    { name: 'LAMP Stack', label: 'LAMP', message: 'Stack', color: '777BB4', logo: 'php', logoColor: 'white' },
    { name: 'LEMP Stack', label: 'LEMP', message: 'Stack', color: '269539', logo: 'nginx', logoColor: 'white' },
    { name: 'T3 Stack', label: 'T3', message: 'Stack', color: '000000', logo: 'next.js', logoColor: 'white' },
    { name: 'Jamstack', label: 'Jamstack', message: 'Stack', color: 'F0047F', logo: 'jamstack', logoColor: 'white' },
    { name: 'WISA Stack', label: 'WISA', message: 'Stack', color: '0078D7', logo: 'windows', logoColor: 'white' },
    { name: 'Django Stack', label: 'Django', message: 'Stack', color: '092E20', logo: 'django', logoColor: 'white' },
    { name: 'Flask Stack', label: 'Flask', message: 'Stack', color: '000000', logo: 'flask', logoColor: 'white' },
    { name: 'FastAPI Stack', label: 'FastAPI', message: 'Stack', color: '009688', logo: 'fastapi', logoColor: 'white' },
    { name: 'Spring Boot Stack', label: 'Spring Boot', message: 'Stack', color: '6DB33F', logo: 'springboot', logoColor: 'white' },
    { name: 'Laravel Stack', label: 'Laravel', message: 'Stack', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
    { name: 'Rails Stack', label: 'Rails', message: 'Stack', color: 'CC0000', logo: 'rubyonrails', logoColor: 'white' },
    { name: 'Phoenix Stack', label: 'Phoenix', message: 'Stack', color: 'FD4F00', logo: 'elixir', logoColor: 'white' },
    { name: 'Flutter Stack', label: 'Flutter', message: 'Stack', color: '02569B', logo: 'flutter', logoColor: 'white' },
    { name: 'React Native Stack', label: 'React Native', message: 'Stack', color: '61DAFB', logo: 'react', logoColor: 'white' },
    { name: 'Ionic Stack', label: 'Ionic', message: 'Stack', color: '3880FF', logo: 'ionic', logoColor: 'white' },
    { name: 'Go Stack', label: 'Go', message: 'Stack', color: '00ADD8', logo: 'go', logoColor: 'white' },
    { name: 'Rust Stack', label: 'Rust', message: 'Stack', color: '000000', logo: 'rust', logoColor: 'white' },
    { name: '.NET Stack', label: '.NET', message: 'Stack', color: '512BD4', logo: 'dotnet', logoColor: 'white' },
    { name: 'Serverless Stack', label: 'Serverless', message: 'Stack', color: 'FF9900', logo: 'serverless', logoColor: 'white' },
    { name: 'GraphQL Stack', label: 'GraphQL', message: 'Stack', color: 'E10098', logo: 'graphql', logoColor: 'white' },
    { name: 'TensorFlow Stack', label: 'TensorFlow', message: 'Stack', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white' },
    { name: 'PyTorch Stack', label: 'PyTorch', message: 'Stack', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white' },
    { name: 'Keras Stack', label: 'Keras', message: 'Stack', color: 'D00000', logo: 'keras', logoColor: 'white' },
    { name: 'Hadoop Stack', label: 'Hadoop', message: 'Stack', color: '66CCFF', logo: 'apachehadoop', logoColor: 'black' },
    { name: 'Spark Stack', label: 'Spark', message: 'Stack', color: 'E25A1C', logo: 'apachespark', logoColor: 'white' },
    { name: 'Kafka Stack', label: 'Kafka', message: 'Stack', color: '231F20', logo: 'apachekafka', logoColor: 'white' },
    { name: 'Elastic Stack', label: 'ELK', message: 'Stack', color: '005571', logo: 'elasticstack', logoColor: 'white' },
    { name: 'Prometheus Stack', label: 'Prometheus', message: 'Stack', color: 'E6522C', logo: 'prometheus', logoColor: 'white' },
    { name: 'Terraform Stack', label: 'Terraform', message: 'Stack', color: '623CE4', logo: 'terraform', logoColor: 'white' },
    { name: 'Kubernetes Stack', label: 'Kubernetes', message: 'Stack', color: '326CE5', logo: 'kubernetes', logoColor: 'white' },
    { name: 'Docker Stack', label: 'Docker', message: 'Stack', color: '2496ED', logo: 'docker', logoColor: 'white' },
    { name: 'Ansible Stack', label: 'Ansible', message: 'Stack', color: 'EE0000', logo: 'ansible', logoColor: 'white' },
    { name: 'Android Stack', label: 'Android', message: 'Stack', color: '3DDC84', logo: 'android', logoColor: 'white' },
    { name: 'iOS Stack', label: 'iOS', message: 'Stack', color: '000000', logo: 'apple', logoColor: 'white' },
    { name: 'Unity Stack', label: 'Unity', message: 'Stack', color: '000000', logo: 'unity', logoColor: 'white' },
    { name: 'Unreal Stack', label: 'Unreal', message: 'Stack', color: '0E1128', logo: 'unrealengine', logoColor: 'white' }
];

// --- Execution ---

let content = `# 🥞 Tech Stacks (150+ Badges)

This category contains **${services.length * 9}** badge variations for popular Technical Stacks and combinations.

> **Tip:** Use \`Ctrl + F\` to find your stack.

---

`;

services.forEach(s => {
    content += generateSection(s);
});

// Write to file
const targetPath = path.join(__dirname, '../Categories/14-development-stacks.md');
fs.writeFileSync(targetPath, content);
console.log(`Generated ${services.length * 9} badges in ${targetPath}`);
