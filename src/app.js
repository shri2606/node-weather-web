const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup HandleBars engone and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Shridhar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Shridhar'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help???',
        name: 'Shridhar'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must prvoide search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: 'Error 404',
        name: 'Shridhar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title: 'Error 404',
        name:'Shridhar',
        errorMessage:'Page not Found'
    })
})

app.listen(port, () =>{
    console.log("Server is Running on port" + port)
})