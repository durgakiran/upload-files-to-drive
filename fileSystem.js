const { Dir } = require('fs');
const { opendir } = require('fs/promises');
const path = require('path');

/**
 * 
 * @param {string} path directory path
 */
async function listAllFiles(path) {
    const folder = await opendir(path);
    await printFiles(path, folder);
}

/**
 * 
 * @param {string} p path to current folder
 * @param {Dir} folder directory from filesystem
 */
async function printFiles(p, folder) {
    for await (const dirent of folder) {
        if (dirent.isFile()) {
            console.log(`file name: ${dirent.name}`);
        } else if (dirent.isDirectory()) {
            const newP = path.join(p, dirent.name)
            await printFiles(newP, await opendir(newP));
        }
    }
}

function getFileOneByOne() {

}

module.exports = { listAllFiles };
