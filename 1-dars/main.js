// selectors
let listElement = document.querySelector(".list");

// localstorage page number
if(!localStorage.getItem("PAGE_NUM")) {
    localStorage.setItem("PAGE_NUM", 1);
};

// request xml http request
function ajax() {
        let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true)
    xhr.onload = function () {
        if(this.status === 200) {
            let response = JSON.parse(this.response);
            let start,
                end,
                pageNumber = Number(localStorage.getItem("PAGE_NUM"));
            switch(pageNumber) {
                case 1: start = 0; end = 20; break;
                case 2: start = 20; end = 40; break;
                case 3: start = 40; end = 60; break; 
                case 4: start = 60; end = 80; break;
                case 5: start = 80; end = 100; break;
            }    
            listElement.innerHTML = ``
            for(let i = start; i < end; i++) {
                listElement.innerHTML += `
                <li class="list-text"><h2>${response[i].title}</h2>
                <p>${response[i].body}</p>`;
            }   
        }
    }
    xhr.send()
}
// first render
window.addEventListener("DOMContentLoaded", () => {
    ajax();
});

// next render
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".btn").forEach((e) => {
            e.classList.remove("active")
        });
        e.target.classList.add("active");
        localStorage.setItem("PAGE_NUM", Number(e.target.value));
        ajax();
    });
});

// 🔸Vazifa

// - https://jsonplaceholder.typicode.com/posts saytidan postlar AJAX bilan olinib hammasi chiroyli dizaynda sahifaga chiqishi kerak
// - 100 ta post bo'ladigan bo'lsa sahifaga 20 tadan chiqishi kerak
// - 20 ta post tagida 100 / 20 = 5 bolgani uchun, postlar soniga mos page lar uchun button bo'ladi misol 1 2 3 4 5 buttonlari
// - sahifaga endi kirilgan paytida localStoragedan hozirgi bet raqami qidiriladi, localStorageda bet bo'lmasa 1 deb saqlanadi va 1- page uchun button active bo'ladi va shunga mos birinchi 20 talik uchun post chiqariladi
// - 2 bosilganda 21- 40 oraligida post chiqadi va localStoragedagi bet yangilanadi va 2 button active boladi
// - shu tartibda davom etadi