var expect = require('expect'),
    {generateMessage} = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Jen",
            text = "Shnupkin pies",
            message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});