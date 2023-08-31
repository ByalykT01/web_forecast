const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express conf
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars and use location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Taras Byalyk'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About us',
    name: 'Taras Byalyk'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'information that might help',
    name: 'Taras Byalyk'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })

    
  }
  
  console.log(req.query.search)
    res.send({
      products: []
    })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send ({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('errArt', {
    title: 'Article is missing',
    name: 'Taras Byalyk'
  })
})

app.get('*', (req, res) => {
  res.render('err404', {
    title: 'Error 404',
    name: 'Taras Byalyk',
    desc: 'Page with this path doesn\'t exist'
  })
})

app.listen(port, () => {
  console.log('Server is up on port' + port)
})