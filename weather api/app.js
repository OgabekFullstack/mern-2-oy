svgElement = document.querySelector("svg");

svgElement.querySelectorAll("path").forEach(region => {

    region.addEventListener("click", e => {

        svgElement.querySelectorAll("path").forEach(region => {
            region.classList.remove("active");
        });
        region.classList.add("active");

        let title = region.getAttribute("title");

        getWeather(title).then(weather => {
            let min = Math.floor(weather.main.temp_min - 273);
            let max = Math.floor(weather.main.temp_max - 273);
            let icon = weather.weather[0].icon;
            
            let iconImg = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        
            document.querySelector(".temp").innerHTML = `temperatura min: ${min}, max ${max}`;
            document.querySelector(".wind").innerHTML = `wind: ${weather.wind.speed} m/s`
            document.querySelector("img").src = `${iconImg}`;
            document.querySelector(".region").innerHTML = `${weather.name}`;
        }).catch(function(e) {
            alert(e)
        });

    });
});

function getWeather(region) {
    return new Promise((resolve, reject) => {
        
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=5758ba24f769ac3fb60d2f74e65bac91`);
        
        response.then(function(data) {
            data.json().then(function(weather) {
                if(weather.cod ===404) {
                    reject("City not found")
                } else {
                    resolve(weather);
                } 
            });
        });
        
    });
};
