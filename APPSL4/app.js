
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
// const morgan = require('morgan')
const {loadcontact, findcontact} = require('./utils/contacts')
const port = 3000

// memanggil view engine ejs tidak mengunakan require

app.set('view engine', 'ejs')
app.use(expressLayouts) // third party middleware
app.use(express.static('public')) // built-in middleware

// app.use(morgan('tiny')) // third party middleware

// middleware level aplication

// app.use('/',(req, res, next) => {
//     console.log('time: ', Date.now());
//     next()
// })





app.get('/', (req, res) => {
    const mahasiswa = [{
        nama: 'sand',
        nohp: '130942184325'
    },
    {
        nama: 'sandhi',
        nohp: '130942184325'
    },
    {
        nama: 'sanddhika',
        nohp: '130942184325'
    },
]

    res.render('index', {
        title: 'halaman home',
        layout: 'layouts/main-layout',
        mahasiswa,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'halaman about',
        layout: 'layouts/main-layout',
    })
})


app.get('/contact', (req, res) => {
    const contacts = loadcontact()
    console.log(contacts)
    res.render('contact', {    
        title: 'halaman contact',
        layout: 'layouts/main-layout',
        contacts,
    })
})


// halaman detail
app.get('/contact/:nama', (req, res) => {
const contact = findcontact(req.params.nama)

    res.render('detail', {    
        title: 'halaman contact',
        layout: 'layouts/main-layout',
        contact,
    })
})



// menginput ke url
app.get('/product/:id', (req, res) => {
    res.send(`product id : ${req.params.id} <br> 
    category id : ${req.query.category}`)
}) 


// eroor handling

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1> error not such: 404 </h1>')
})








.listen(port, (req, res) => {
    console.log(`try on the listening port http://localhost${port}`)
})
