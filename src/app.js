const path  = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { appendFile } = require('fs')

const app = express()

//path express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engne
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rakshit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rakshit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help page in testing',
        title: 'Help',
        name:'Rakshit'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must provide address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    

    // res.send({
    //     forcast: 'It is raining',
    //     location:'india',
    //     address: req.query.address
    // })
})




app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//for url in continuation of help pag
app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Rakshit',
        errorMessage: 'Help article not found'
    })
})

// no page is there
app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Rakshit',
        errorMessage: 'Page not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})