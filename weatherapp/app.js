const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log('please provide an address')
}
else {
    geocode(address, (error, { latitude, longitude, location} ) => {
        if (error) {
            return console.log(error); //function stops after return
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }
            console.log(location);
            console.log(forecastData.summary + ' It is ' + forecastData.currentTemp + ' degrees. There is a ' + forecastData.precipChance + '% chance of rain.')
        })
    });
}

