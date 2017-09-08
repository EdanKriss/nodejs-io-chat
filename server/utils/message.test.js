var expect = require('expect'),
    {generateMessage, generateLocationMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Jen",
            text = "Shnupkin pies",
            message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = "Jen",
            latitude = 38.912068,
            longitude = -77.0190228,
            url = 'https://www.google.com/maps?q=38.912068,-77.0190228'
            message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});