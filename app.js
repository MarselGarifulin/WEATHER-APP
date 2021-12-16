const api = {
    key: "c439c1231740941b949f5a3223ff5be4",
    base: "http://api.openweathermap.org/data/2.5/",
}


const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click" , getInput);

function getInput (event) {
    event.preventDefault();
    if(event.type == "click"){
        getData(search.value);
        console.log(search.value)

    }
}

function getData (){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response => {
        return response.json();
    }).then (displayData);
 
}

function displayData (response){
        // console.log(response);
        if  (response.cod === "404"){
            const error = document.querySelector(".error");
            error.textContent = "Такого города нету";
            search.value = ""

        }else {
            const city = document.querySelector(".city")
            city.innerText = `${response.name}, ${response.sys.country} `


            const today = new Date ();
            const date = document.querySelector(".date");
            date.innerText = dateFunction(today) 
            
            const temp = document.querySelector(".temp")
            temp.innerText = `Температура: ${Math.round(response.main.temp)}°C`;
            const weather = document.querySelector(".weather")
            weather.innerText = `Погода: ${response.weather[0].main}`

            const tempRange = document.querySelector(".temp-range")
            tempRange.innerText = `Диапазон: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)} °C `
            
            const weatherIcon = document.querySelector(".weather-icon")
            const iconURL = "http://api.openweathermap.org/img/w/"
            weatherIcon.src = iconURL + response.weather[0].icon + ".png";
            search.value = ""
        }

        }

function dateFunction(d) {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май","Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    //let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница","Суббота", "Воскресенье"];
    
    //let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${date} ${month} ${year}`
}      
