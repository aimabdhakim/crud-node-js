const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index'); //constant homepage untuk mengambil homepage
const {addPersonPage, addPerson, deletePerson, editPerson, editPersonPage} = require('./routes/person');
const port = 8000;

// buat koneksi ke database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express untuk make variable yang ada di environment atau port yang udah didefinisikan di atas
app.set('views', __dirname + '/views'); // set express buat liat views di folder views
app.set('view engine', 'ejs'); // set engine ejs, karena menggunakan ejs
app.use(bodyParser.urlencoded({ extended: false })); //parse data dari client
app.use(bodyParser.json()); // parse form dari client jika berbentuk json
app.use(express.static(path.join(__dirname, 'public'))); // konfigurasi untuk make folder public

// js routing
app.get('/', getHomePage);
app.get('/add', addPersonPage);
app.get('/edit/:id', editPersonPage);
app.get('/delete/:id', deletePerson);
app.post('/add', addPerson);
app.post('/edit/:id', editPerson);

// set aplikasi untuk jalan di port ini
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
