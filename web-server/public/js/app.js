console.log("client side js file loaded");

const weatherForm = document.querySelector('#weatherSearch');
const search = document.querySelector('#weatherInput');
const messageOne = document.querySelector('#weather-message-1');
const messageTwo = document.querySelector('#weather-message-2');
const messageThree = document.querySelector('#weather-message-3');
const weatherImage = document.querySelector('#weatherImage')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading!';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    weatherImage.textContent = '/img/someimage.jpg';

    fetch('http://localhost:3000/weather/json/?address=' + location).then((response => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = "It is currently " + data.forecast.currentTemp + "C. " + data.forecast.summary + " There is a " + data.forecast.precipitationChance * 100 + "% chance of " + data.forecast.precipitationType+ ".";
                if (data.forecast.precipitationType !== undefined) {
                    messageThree.textContent = "Next hour, at " + data.forecast.hourly.data[0].time + " (add actual timestamps to this later) it will be " + data.forecast.hourly.data[0].temperature + "C."
                }
                else {
                    messageThree.textContent = "Next hour, at " + data.forecast.hourly.data[0].time + " (add actual timestamps to this later) it will be " + data.forecast.hourly.data[0].temperature + "C."
                }
                weatherImage.textContent = "/img/"+ data.forecast.icon + ".jpg";
            }
            document.getElementById("weatherImage").src = weatherImage.textContent
        })
    }));
});
