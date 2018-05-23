
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const baseDir = "dist/"
const targetFile = "file.png";

// default task
gulp.task('default', () =>  {
  let dirs = getDirs(baseDir,targetFile);
  console.log (dirs)
});


/**
 * Returns an array of directories containing certain file
 * @param {string} dir
 *  Root directory for the seach
 * @param {string} flagFile
 *  File to found
 */
function getDirs (dir, flagFile, dirList = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
      try {
        dirList = getDirs(dirFile, flagFile, dirList);
      }
      catch (err) {
        if (err.code === 'ENOTDIR') {
          file === flagFile ? dirList.push( dir.replace(baseDir,'') ):'';
        }else{
          throw err;
        }
      }
  });
  return dirList;
}
