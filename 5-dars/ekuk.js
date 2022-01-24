module.exports = (a, b) => {
    let katta = a > b ? a : b
    let kichik = a > b ? b : a

    while(!(katta % kichik ===0)) {
        katta += katta
    }
    
    return katta
}