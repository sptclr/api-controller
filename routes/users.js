const router = require('express-promise-router')();

const usersController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(usersController.index)
    .post(validateBody(schemas.userSchema), usersController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), usersController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], usersController.replaceUser) //replace = update
    .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)], usersController.updateUser)
    .delete(validateParam(schemas.idSchema, 'userId'), usersController.deleteUser);

router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'), usersController.getUserCars)
    .post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userCarSchema)], usersController.newUserCar);


module.exports = router