const express = require('express')
const app = express()
// untuk menangkap body dari luar (frontend)
const bodyParser = require('body-parser')
const port = 3000


// file connection db
const db = require('./connection')

// file connection response
const response = require('./response')


// ini mengambil body dari frontend
// yg artinya kita ambil format dari frontend yg mengirim ke kita berupa post format yg kita tangkap jadi json
app.use(bodyParser.json())


// route / url / endpoint 

// app.get('/', (req, res) => {
//     db.query("SELECT * FROM mahasiswa", (error, result) => {
//         // hasil data dr mahasisiwa
//         console.log(result)

//         res.send(result)
//     })
// })


// route / url / endpoint 

app.get('/', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        // hasil data(result) dr mahasisiwa
        response(200, result, "get all data mahasiswa", res)
    })
})


// hello

// app.get('/hello', (req, res) => {
//     console.log({ urlParam: req.query.alamat})
//     res.send('hello world lllll???')
// })


// hello

app.get('/find', (req, res) => {
//  console.log('find nim', req.query.nim)

const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim} `
 db.query(sql, (error, result) => {
    response(200, result, "find mahasisiwa", res)
 })
})



// post, delete, dll(mesti diperlakukana berbeda)
app.post('/login', (req, res) => {
    console.log(req.body)
    console.log({ requestFromOutside: req.body }) // ini untuk trouble shooting
    const username = req.body.username
    // 
    if(username === usernameFromDbExist) {
        res.status(400).send('usernama sudah digunakan')
    }
    res.send('success login')
})

app.put('/username', (req, res) => {
 console.log({updateData: req.body})
 res.send('update succes')
})



.listen(port, () => {
    console.log(`running to http://localhost${port}`)
})




// res apa yg dikirim (ke postman nya)

// apa yg dipanngil ( dari postman misalnya )