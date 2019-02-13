const router = require('express-promise-router')();


const carsController = require('../controllers/cars');

const {
    validateBody,
    validateParam,
    schemas
} = require('../helpers/routeHelpers');

router.route('/')
    .get(carsController.index)
    .post(validateBody(schemas.carSchema), carsController.newCar);

router.route('/:carId')
    .get(validateParam(schemas.idSchema, 'carId'),
         carsController.getCar)
    .put([validateParam(schemas.idSchema, 'carId'),
          validateBody(schemas.putCarSchema)],
         carsController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'carId'),
            validateBody(schemas.patchCarSchema)],
            carsController.updateCar)
    .delete(validateParam(schemas.idSchema, 'carId'),
            carsController.deleteCar)

module.exports = router;
