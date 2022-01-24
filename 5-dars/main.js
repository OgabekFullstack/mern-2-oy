let ekub = require("./ekub");
let ekuk = require("./ekuk");

console.log("ekuk(14, 9)" + ekuk(14, 9));
console.log("ekub(14, 9)" + ekuk(14, 9));




// Topshiriq:

// -nodejs da dastur qilish kerak
// -bitta main js fayl boladi va ikkita module boladi undan tashqari
// -har bir modul bitta funksiya export qiladi
// -birinchi modul ekub, ikkinchisi ekuk ni topish uchun
// -yani har ikkala funksiya ikkitadan son qabul qiladi parametrga va ekub ekukni topib beradi
// -ikkala module ham main fayl ga import qilinib chaqirilib, funksiyalardan qaytgan natijalar consolega chiqishi kerak