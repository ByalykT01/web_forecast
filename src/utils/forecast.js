const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=9e79baa25a2c3d0a81c92289e485526e&query=' + latitude + ',' + longitude

request({url, json: true}, (error, {body}) => {
  if(error){
    callback('Unable to connect', undefined)
  }
  else if(body.error){
    callback('Unable to find location', undefined)
  }
  else{
    callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees')
  }
})
}

module.exports = forecast