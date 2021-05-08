const jwt = require('jsonwebtoken');
const { logger } = require('../midwares/logger')
const config = require('../config')
module.exports = {

    sign: function (id) {
        const payload = {id};
        var token = jwt.sign(payload, config.jwtSecret);
        // console.log(`token = ${token}`);
        return token;
    },

    verify: function (token) {

        return jwt.verify(token, config.jwtSecret,  { expiresIn:  config.expiresIn });
        // return new Promise( resolve => {
        //     jwt.verify(token, config.jwtSecret,  { expiresIn:  config.expiresIn }, (err, payload) => {
        //         resolve({err, payload})
        //     })
        // } )
    }
}