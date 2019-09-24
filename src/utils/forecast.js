const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/dd7be3626a268e0b49949013bdf7f168/' + long + ',' + lat+ '?units=si'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,  response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' celsius degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')   
        }
    })
}

module.exports = forecast