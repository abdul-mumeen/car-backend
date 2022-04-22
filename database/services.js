const sqlite3 = require('sqlite3').verbose();
const {v4} = require('uuid');

const db = new sqlite3.Database('./database/carmart.db');

const createCar = (name, color, year, model, description, price, images) => {
    return new Promise((resolve, reject) => {
        db.run(`insert into cars (name, color, year, model, description, price, id, images) 
        values (?, ?, ?, ?, ?, ?, ?, ?)`, [name, color, year, model, description, price, v4(), images], (error) => {
            if (error) {
                console.log(error)
                reject('Error creating car entity!');
            } else {
                resolve();
            }
        })
    });
}

const getCars = () => {
    return new Promise((resolve, reject) => {
        db.all(`select * from cars`, (error, rows) => {
            if (error) {
                console.log(error)
                reject('Error retrieving cars data!');
            } else {
                resolve(rows);
            }
        })
    });
}

const getCar = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`select * from cars where id = ?`, id, (error, row) => {
            if (error) {
                console.log(error)
                reject('Error retrieving car details!');
            } else {
                resolve(row);
            }
        })
    });
}

const deleteCar = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`delete from cars where id = ?`, id, (error) => {
            if (error) {
                console.log(error)
                reject(`Error deleting car with id - ${id}`);
            } else {
                resolve();
            }
        })
    });
}


const updateCar = (id, name, color, year, model, description, price, images) => {
    return new Promise((resolve, reject) => {
        db.run(`update cars set name = ?, color = ?, year = ?, model = ?, description = ?, price = ?, images = ? where id = ?`, 
            [name, color, year, model, description, price, images, id], (error) => {
            if (error) {
                console.log(error)
                reject(`Error updating car with id - ${id}`);
            } else {
                resolve();
            }
        })
    });
}


module.exports = {createCar, getCars, getCar, deleteCar, updateCar}