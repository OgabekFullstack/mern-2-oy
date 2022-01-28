const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "..", "test"), (err) => {});
// test nomli papka yaratadi

fs.writeFile(path.join(__dirname, "..", "test", "text.txt"), "fs file help", (error) => {});
// papka bo'lmasa papka ham ochadi,ustiga ma'lumot yozadi

fs.appendFile(path.join(__dirname, "..", "test", "text.txt"), " from append file", () => {});
//davomidan yozadi

fs.readFile("../test/text.txt", (err, data) => {
    if(!err) {
        console.log(data); //<Buffer 66 73 20 66 69 6c 65 20 68 65 6c 70>

        let file = Buffer.from(data).toString();    //fs file help bufferni string qilib o'qib olyabmiz 
        console.log(file);
    } 
});

fs.readFile("../test/text.txt", {encoding: "utf-8"}, (err, data) => {
    //encoding qilib olyabmiz yuqoridagi usul noqulay ;)
    if(!err) console.log(data);
});

fs.rename(path.join(__dirname, "..", "test", "text.txt"), path.join(__dirname, "..", "test", "fsHelp.txt"), (e) => {});
// rename qiladi 

// fs.unlink(path.join(__dirname, "..", "test", "fsHelp.txt"), () => {});
// o'chirib tashlaydi

fs.readdir(path.join(__dirname, ".."), (err, files) => {
    if(!err) {
        files.forEach(file => {
            console.log(file)
            // .git
            // .gitignore
            // 1-dars
            // 2-dars
            // 3-dars
            // 5-dars
            // 6-dars
            // google app
            // README.md
            // test
            // weather api
        });
    }
});



