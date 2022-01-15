const inputField = document.getElementById("input")
const wIcon = document.querySelector("img")

let api;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
})

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c80ff65592bede63a29e8f62ce7a1a0e`;
    fetchData();
}

function fetchData() {
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}


function weatherDetails(info) {
    if (info.cod == "404") {
        wIcon.src = "./img/error.png";
        document.querySelector(".temp .numb").innerText = "-";
        document.querySelector(".weather").innerText = "NOT FOUND";
        document.querySelector(".location span").innerText = ``;
        document.querySelector(".temp .numb-2").innerText = "";
        document.querySelector(".humidity span").innerText = "";
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;

        if (id == 800) {
            wIcon.src = "./img/clear.png";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "img/storm.png";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "img/snow.png";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "img/haze.png";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "img/cloud.png";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "img/rain.png";
        }

        document.querySelector(".temp .numb").innerText = Math.floor(temp);
        document.querySelector(".weather").innerText = description;
        document.querySelector(".location span").innerText = `${city}, ${country}`;
        document.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        document.querySelector(".humidity span").innerText = `${humidity}%`;
        // infoTxt.classList.remove("pending", "error");
        // infoTxt.innerText = "";
        // inputField.value = "";
        
    }
}
