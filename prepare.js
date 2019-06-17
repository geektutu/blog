const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;


const SOURCE_POST_DIR = 'source/_posts/';

const walkDir = (dir, callback) => {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
};

spawn('rm', ['-rf', SOURCE_POST_DIR])
spawn('mkdir', ['-p', SOURCE_POST_DIR])

walkDir('./posts', (filePath) => {
    if (filePath.endsWith('.md') && !filePath.endsWith('posts/README.md')) {
        let assetsDirPath = filePath.slice(0, -3);
        spawn('cp', ['-p', filePath, SOURCE_POST_DIR])
        if (fs.existsSync(assetsDirPath)) {
            spawn('cp', ['-r', '-p', assetsDirPath, SOURCE_POST_DIR])
        }
    }
})



