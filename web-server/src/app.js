const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

//Define paths for express configs
const pubPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars engine, views setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(pubPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'cool and new weather website',
        name: 'Emily Shi'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'oh nooooooooooooo',
        title: 'Help',
        name: 'emily'
    })
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'about title',
        name: 'Emily Shi'
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you gotta provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you gotta provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Emily Shi',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Emily Shi',
        errorMessage: 'not found'
    })
});

app.listen(3000, () => {
    console.log('server running on port 3000')
});
