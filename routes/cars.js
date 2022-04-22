const express = require('express');
const router = express.Router();
const { createCar, getCars, getCar, deleteCar, updateCar } = require('../database/services');

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const {name, color, model, year, price, description, images} = body;
        const imagesURL = images ? images.join(',') : '';
        await createCar(name, color, year, model, description, price, imagesURL)
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
        res.json({cars: cars.map(car => {
                car.images = car.images.split(',');
                return car;
            })
        });
    } catch (error) {
        res.status(500)
        res.json({message: error});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const car = await getCar(id)
        if (!car) {
            res.status(404);
            res.json({"message": "Car details not found!"});
            return;
        }
        car.images = car.images.split(',');
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
        const {name, color, model, year, price, description, images} = body;
        const imagesURL = images ? images.join(',') : '';
        await updateCar(id, name, color, year, model, description, price, imagesURL)
        res.json({message: `Car with id - ${id} has been successfully updated`});
    } catch (error) {
        res.status(500)
        next(error)
    }
});

module.exports = router;