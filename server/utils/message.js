const moment = require('moment');
const API_KEY = process.env.API_KEY || require('../api-key');

module.exports.generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

module.exports.generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        // url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        // url: `https://www.google.com/maps/embed/v1/view?center=${latitude},${longitude}&zoom=12&key=${API_KEY}`,
        url: `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&zoom=12&key=${API_KEY}`,        
        createdAt: moment().valueOf()
    };
};