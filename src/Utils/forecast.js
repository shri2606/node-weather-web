const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=1c665905c9214cf7a63bafc56a800de8&query=' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude) + '&units=f'
    request({url, json:true}, (error, {body}= {}) => {
        if(error){
            callback("Unable to connect", undefined)
        }else if(body.error){
            callback("Unable to find Location.", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+". It is currently " + body.current.temperature + " degrees. But feels like " + body.current.feelslike +" degrees.")
        }
    })
}


module.exports= forecast