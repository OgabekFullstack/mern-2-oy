const path = require("path");

console.log(path.basename("/lessons/6-dars/path.js"));  
//path.js

console.log(__dirname);
// D:\Backend darslarim\2-month\lessons\6-dars

console.log(__filename);
// D:\Backend darslarim\2-month\lessons\6-dars\path.js

console.log(path.extname(__filename));
//  .js   filening formatini olib beradi

console.log(path.parse(__filename));
// {
//     root: 'D:\\',
//     dir: 'D:\\Backend darslarim\\2-month\\lessons\\6-dars',
//     base: 'path.js',
//     ext: '.js',
//     name: 'path'
// }

let p = path.join(__dirname, '..', '1-dars', 'main.js');
console.log(p);
// D:\Backend darslarim\2-month\lessons\1-dars\main.js
// path.join vazifasi path yasab beradi






