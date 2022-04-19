const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const db = new sqlite3.Database('./database/carmart.db');
const carsRouter = require('./routes/cars')
const app = express();
const port = 3000 || process.env.PORT;

try {
    db.run(`CREATE TABLE IF NOT EXISTS cars (
        id uuid PRIMARY KEY,
        color varchar(20) NOT NULL,
        year integer NOT NULL,
        name varchar(50) NOT NULL,
        model varchar(50) NOT NULL,
        price integer NOT NULL,
        description text
    )`).close();
} catch (e) {
    console.log("Error creating the table - ", e)
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/cars', carsRouter);

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});