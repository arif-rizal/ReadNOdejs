
const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
// ({extended: true})) tambah ini agr cli normal kembali
// body-parser deprecated undefined extended: provide extended option app.js:13:17
const {body, validationResult, check} = require('express-validator')

app.use(express.urlencoded({extended: true})) // built-in middleware
// ===========>>> <<<=========== \\
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

// konfigurasi flash 3 diatas
app.use(cookieParser('secret'))
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(flash())



// ===========>>>> lokal module contact.js <<<<=========== \\
const {loadcontacts, findcontact , addcontact, cekduplikat, deletecontact } = require('./utils/contacts')

// memanggil view engine ejs tidak mengunakan require(ejs)
app.set('view engine', 'ejs')
///////////////////////////////////////
app.use(expressLayouts) // third party middleware
app.use(express.static('public')) // built-in middleware
//////////////=== konfigurasi yg diatas ====\\\\\\\\\\\\\\\


// ==== HALAMAN ROOT[HOMEPAGE] ==== \\ 

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



/// ============== ROOT CONTACT.EJS ========== \\\
app.get('/contact', (req, res) => {
    const contacts = loadcontacts()
    // console.log(contacts)
    res.render('contact', {    
        title: 'halaman contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    })
})


// menambahkan form data contact (add) hrs diatas agr bisa ditangkap............................

app.get('/contact/add', (req, res) => {

    res.render('add-contact', {
        title: ' FORM add data contact',
        layout: 'layouts/main-layout',
    })
})


// {1} proses data contact yg diatas
// method post untuk menerima data form add contact nya
// req.body agar menangkap data yg diinput..

// app.post('/contact', (req, res) => {

// console.log(req.body)//('send succes di tampilkan di web)
    // res.send('send succes')

    // res.send(req.body)
// })


// {2} procces data yg agak kompleks contact yg mengirimkan data ke file json 

// app.post('/contact',  (req, res) => {
//  addcontact(req.body)
//  res.redirect('/contact') // balik ke contact
// })




// {3} proccess data mengunakan express-validator
// check adl validator massage
app.post('/contact', 
[
    // cek duplikat nama dgn body
    body('nama').custom((value) => {
      const duplikat = cekduplikat(value)
      if(duplikat) {
        // throw sama dgn kita ksih false tp dgn pesan eror
        throw new Error('nama contact sudah digunakan')
      }  
      return true
    }),

    check('email', 'email tidak valid!').isEmail(),
    check('nohp', 'nomor hp tidak valid').isMobilePhone('id-ID')
],

    (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array()})
        res.render('add-contact', {
            title: 'form data contact',
            layout: 'layouts/main-layout',
            errors: errors.array()
        })
    } else {
        addcontact(req.body)
        // kirimkan flash messange dengan req.flash
        req.flash('msg', 'data success receive')
        res.redirect('/contact')
    }
    }
)



// halaman delete contact
app.get('/contact/delete/:nama', (req, res) => {
// ini mengecek file contacts.json    
const contact = findcontact(req.params.nama)  
// jika contact tidak ada
if(!contact) {
    res.status(404)
    res.send('<h2> file not such: 404 </h2>')
} else {
    deletecontact(req.params.nama)
    req.flash('msg', 'data success deleted')
    res.redirect('/contact')
}
})

/// ===>>> form ubah (edit) data contact <<<=== \\\
app.get('/contact/edit/:nama', (req, res) => {
const contact = findcontact(req.params.nama)

    res.render('adit-contact', {
        title: ' FORM edit data contact',
        layout: 'layouts/main-layout',
        contact,
    })
})

// halaman detail(detail.ejs)
app.get('/contact/:nama', (req, res) => {
// ini mengecek file contacts.json    
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
