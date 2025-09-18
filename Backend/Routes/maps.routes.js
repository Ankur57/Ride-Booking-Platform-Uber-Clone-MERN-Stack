const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const mapContoller = require('../controller/map.controller');
const {query} = require('express-validator');


router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
     authMiddleware.authUser, mapContoller.getCoordinate);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapContoller.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapContoller.getAutoCompleteSuggestions
)
{/*Check post man get-distance-time 7.49.00*/}
module.exports = router;