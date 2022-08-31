const city = document.getElementById("city");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city-name");
const temp_real_val = document.getElementById("temp-real-val");
const temp_status = document.getElementById("temp-status");
const dataHide = document.querySelector(".middle-layer");

const day = document.getElementById("day");
const date = document.getElementById("today-date");

// GET THE CURRENT DAY

const getCurrentDay = () =>{
    const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today_day = new Date();
    let currentDay = weekDay[today_day.getDay()];
    // console.log(currentDay);
    return currentDay;
}

day.innerText = getCurrentDay();

// GET CURRENT DATE

const getCurrentDate = () =>{
    const month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEPT","OCT","NOV","DEC"];
    const today_date = new Date();
    let monthName = month[today_date.getMonth()];
    let currentDate = today_date.getDate();
    // console.log(monthName);
    // console.log(currentDate);
    return `${currentDate} ${monthName}`;
}

date.innerText = getCurrentDate();

// GET WEATHET INFORMATION

const getInformation = async(event) =>{
    event.preventDefault();
    let cityVal = city.value;

    if(cityVal === ""){
        city_name.innerText = `Please Write The City Name Before Search`;
        dataHide.classList.add("data-hide");
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=692c0ca681a4eef3b94aef99ab453b8f`;
            const responce = await fetch(url);
            const data = await responce.json();
            // console.log(data);
            const arrData = [data];
            // console.log(arrData);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear"){

                temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;

            }else if(tempMood == "Clouds"){

                temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;

            }else if(tempMood == "Rain"){

                temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>`;

            }else if(tempMood == "Haze"){

                temp_status.innerHTML = `<i class="fas fa-smog" style="color: #a4b0be;"></i>`;

            }else{

                temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
            }

            dataHide.classList.remove("data-hide");

        }catch{
            city_name.innerText = `Please Enter a Valid City Name OR Enter The City Name Properly`;
            dataHide.classList.add("data-hide");
        }
    }

}
submitBtn.addEventListener("click", getInformation);