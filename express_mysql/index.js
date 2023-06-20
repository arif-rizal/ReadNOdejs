const express = require('express')
const app = express()
// untuk menangkap body dari luar (frontend)
const bodyParser = require('body-parser')
const port = 3000


// ini mengambil body dari frontend
// yg artinya kita ambil format dari frontend yg mengirim ke kita berupa post format yg kita tangkap jadi json
app.use(bodyParser.json())


// route / url / endpoint 

app.get('/', (req, res) => {
    res.send('utama')
})

// hello

app.get('/hello', (req, res) => {
    console.log({ urlParam: req.query.alamat})
    res.send('hello world lllll???')
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