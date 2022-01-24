module.exports = (a, b)=>{
    let katta = a>b ? a : b;
    let kichik = a<b ? a : b;
    let javob = 1;
    for (let i = 1; i <= kichik; i++) {
        ekub = (katta%i===0 && kichik%i===0) && i;
        if(ekub > javob){
            javob = ekub
        }
    }
    return javob
}