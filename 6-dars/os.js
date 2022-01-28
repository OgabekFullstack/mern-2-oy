const os = require("os");

const totalMem = os.totalmem();
console.log(totalMem / 1024 / 1024); //on Megabytes

const freeMem = os.freemem();
console.log(freeMem / 1024 / 1024); //MB

const upTime = os.uptime()
console.log(upTime / 60); // Minute

const userInfo = os.userInfo();
console.log(userInfo) // user info object

