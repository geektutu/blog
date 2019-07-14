const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;


const SOURCE_POST_DIR = 'source/_posts/';

const walkDir = (dir, callback) => {
    fs.readdirSync(dir).forEach(f => {
        if (f.startsWith('.')) {
            return;
        }
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
};

exec(['rm -rf', SOURCE_POST_DIR].join(' '))
exec(['mkdir -p', SOURCE_POST_DIR].join(' '))

walkDir('./posts', (filePath) => {
    if (filePath.endsWith('.md') && !filePath.endsWith('README.md')) {
        let assetsDirPath = filePath.slice(0, -3);
        exec(['cp -p', filePath, SOURCE_POST_DIR].join(' '))
        if (fs.existsSync(assetsDirPath)) {
            exec(['cp -r -p', assetsDirPath, SOURCE_POST_DIR].join(' '))
        }
    }
})



