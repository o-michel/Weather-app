// console.log("yes am ative");

const locationEle = document.getElementById('location');
const temp = document.getElementById('temp');
const tempRange = document.getElementById('tempRange');
const discribe = document.getElementById('discribe');
const fullTimeEle = document.getElementById("fullTime")
const fullDateEle = document.getElementById("fullDate")

const windEle = document.getElementById("wind")
const tempEle = document.getElementById("TEMP")
const humEle = document.getElementById("hum")
const dewPEle = document.getElementById("dewP")




const intDay = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday','Friday','Satursday'];

const intMonth = ['Jan', 'Feb', 'March', 'April', 'May','June','August', 'Sep', 'Oct', 'Nov','Dec'];

// const APIkey = "3b4fc5549d1ec56718e763ddf5eff54b";
// const APIkey = "b78a2f987634576bce164db31018c3d3";
const APIkey = "49cc8c821cd2aff9af04c9f98c36eb74";


setInterval(() => {
    const time = new Date();
    const month =time.getMonth();
    const date = time.getDate()
    const day = time.getDay();
    const hours = time.getHours();
    const hrsIn12HrsFormart = hours >= 13 ?hours %12 : hours
    const min = time.getMinutes();
    // const sec = time.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";


    fullTimeEle.innerHTML = hrsIn12HrsFormart + ':' + min + ' ' + `<span class="ampms" id="ampm">${ampm}</span></div>`
    fullDateEle.innerHTML = intDay[day] + ', ' + date + ' ' + intMonth[month];

    // console.log(date);
}, 1000);

const getWeatherData = ()=>{
    navigator.geolocation.getCurrentPosition((success) =>{
        // console.log(success);

        let { latitude, longitude} = success.coords;
 
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${APIkey}&units=metric`).then(res => res.json()).then(data => {
            console.log(data);
            let {clouds, feels_like, dew_point, humidity, pressure, temp, wind_speed, weather} = data.current;
            
            discribe.innerHTML = weather[0].description
            // console.log(weather);

            locationEle.innerHTML = data.timezone;

            windEle.innerHTML = `WIND <br> ${wind_speed} <span>mph</span> `
            tempEle.innerHTML = `TEMPERATURE <br> ${temp} <span>°C</span>`
            humEle.innerHTML = `HUMIDITY <br> ${humidity} <span>%</span>`
            // dewPEle.innerHTML = ` DEW POINT <br> ${dew_point} <span>°f</span>`
            
        })
    })

}

getWeatherData()