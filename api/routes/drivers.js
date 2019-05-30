var express = require('express');
var router = express.Router();
var socketApi = require('../socketApi');

//var io = socketApi.io;
socketApi.sendNotification();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var obj = { 
        center: { 
            lat: 5.6219868, 
            lng: -0.23223
        },
        locations: [
            {
                username: "john",
                id: 1,
                lat: 5.6219868, 
                lng: -0.23223
            },
            {
                username: "Roy",
                id: 2,
                lat: 5.6230000, 
                lng: -0.23229
            },
            {
                username: "Kevin",
                id: 3,
                lat: 5.6240000, 
                lng: -0.23232
            }
        ] 
    };
    res.json(obj);
});

module.exports = router;
