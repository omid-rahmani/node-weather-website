const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const pubdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handelbars enginge and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pubdir))

app.get('' , (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'omid'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'omid'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help page',
        name: 'omid'
    })
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 not found',
        name: 'omid',
        error: 'help article not found'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            Error: 'you must provide an address'
        })
    }
    geocode(address, (error, data) => {
        if (address) {
            if (error) {
                return res.send({error})
           }
           forecast(data.latitude, data.longitude, (error, Response) => {
               if (error) {
                   return  res.send({error})
               }
               res.send({ Location: data.location,
                Response  
            })
             })
        } else {
            console.log('write a city name');
    
        }
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 not found',
        name: 'omid',
        error: 'page not found'
        
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
    
})