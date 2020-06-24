const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=554443304c8660eff1b03a1f713a1f85&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    e.preventDefault();
    const newWeather_Zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, newWeather_Zip, apiKey)
        .then(function(enteredData) {
            console.log(enteredData);
            postData('/add', { date: newDate, temp: enteredData.main.temp, content })
        }).then(function(newData) {
            updateUI();
        })
}

const getWeather = async(baseURL, newWeather_Zip, apiKey) => {

    const response = await fetch(baseURL + newWeather_Zip + apiKey)
    try {
        const enteredData = await response.json();
        console.log(enteredData)
        return enteredData;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async(url = '', data = {}) => {
    const request = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        })
    })
    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }

};

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + '&#8451';
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("error", error);
    }
};