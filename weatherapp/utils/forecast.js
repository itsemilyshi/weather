const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/afa31de0858996248a1c7b9820a4072f/'+ latitude + ',' + longitude + '?units=si';

    request ( { url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather services')
        }
        else if (body.error) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                precipChance: body.currently.precipProbability,
                currentTemp: body.currently.temperature

            })
        }
    })
};

module.exports = forecast;

