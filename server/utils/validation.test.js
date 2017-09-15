const expect = require('expect'),
      {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var num = isRealString(1);

        expect(num).toBe(false);
    });
    it('should reject empty string', () => {
        var empt = isRealString('    ');

        expect(empt).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var real = isRealString('  this hurr is real  ');

        expect(real).toBe(true);
    });
});