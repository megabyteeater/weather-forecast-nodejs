const req = require('request')

const forecast = (lat, long, callback)=>{
    const url = 'https://api.weatherstack.com/current?access_key=51a26c623f5941f58b41f5fdba052cca&query='+ lat + ','+ long

    req({ uri:url, json:true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, 'The temperature is: '+ body.current.temperature + ' . Weather description: '+ body.current.weather_descriptions[0])
        }

    })
}

module.exports = forecast