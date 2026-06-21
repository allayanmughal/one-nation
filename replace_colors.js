const fs = require('fs');
const path = require('path');

const directories = ['d:/One_Nation/src/components', 'd:/One_Nation/src'];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Only search immediate components dir, not recursively to avoid issues
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace backgrounds
            content = content.replace(/bg-white/g, 'bg-primary-dark');
            content = content.replace(/bg-gray-50/g, 'bg-primary');
            content = content.replace(/bg-gray-100/g, 'bg-primary-light');
            content = content.replace(/bg-gray-200/g, 'bg-primary-light');
            
            // Replace text colors
            content = content.replace(/text-gray-900/g, 'text-white');
            content = content.replace(/text-gray-800/g, 'text-white');
            content = content.replace(/text-gray-700/g, 'text-white');
            content = content.replace(/text-gray-600/g, 'text-white/80');
            content = content.replace(/text-gray-500/g, 'text-white/70');
            content = content.replace(/text-gray-400/g, 'text-white/60');
            content = content.replace(/text-gray-300/g, 'text-white/50');

            // Fix border colors
            content = content.replace(/border-gray-100/g, 'border-white/10');
            content = content.replace(/border-gray-200/g, 'border-white/20');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

directories.forEach(processDirectory);
console.log('Done.');
