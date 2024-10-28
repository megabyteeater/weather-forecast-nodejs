const req = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoicnhpdCIsImEiOiJjbTB4ZWxhaXkwYXZxMm1zZjhudXk3NzNrIn0.4PsFEY-HOoleTXB7UW5Rug'

    req({ uri: url, json:true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode