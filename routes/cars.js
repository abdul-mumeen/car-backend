const express = require('express');
const router = express.Router();
const { createCar, getCars, getCar, deleteCar, updateCar } = require('../database/services');

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const {name, color, model, year, price, description} = body;
        await createCar(name, color, year, model, description, price)
        res.json({message: "Car successfully created!"});
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({message: error});
    }
});

router.get('/', async (req, res) => {
    try {
        const cars = await getCars()
        res.json({cars});
    } catch (error) {
        res.status(500)
        res.json({message: error});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const car = await getCar(id)
        res.json({car: car});
    } catch (error) {
        res.status(500)
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteCar(id)
        res.json({message: `Car with id - ${id} has been successfully deleted`});
    } catch (error) {
        res.status(500)
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const {name, color, model, year, price, description} = body;
        await updateCar(id, name, color, year, model, description, price)
        res.json({message: `Car with id - ${id} has been successfully updated`});
    } catch (error) {
        res.status(500)
        next(error)
    }
});

module.exports = router;