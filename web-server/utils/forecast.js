const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/afa31de0858996248a1c7b9820a4072f/'+ latitude + ',' + longitude + '?units=si';

    request ( { url, json: true}, (error, {body}) => {
        console.log(body.currently.icon)
        if (error) {
            callback('unable to connect to weather services')
        }
        else if (body.error) {
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                precipitationChance: body.currently.precipProbability,
                precipitationType: body.currently.precipType,
                currentTemp: body.currently.temperature,
                icon: body.currently.icon,
                hourly: body.hourly
            })

        }
    })
};

module.exports = forecast;

