const expect = require('chai').expect;

const {isRealString} = require('./validation');

describe('isRealString function', () => {

    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).to.be.false;
    });


    it('should reject stings with only spaces', () => {
        var res = isRealString('      ');
        expect(res).to.be.false;
    });


    it('should allow string with non-space characters', () => {
        var res = isRealString('  Alexis   ');
        expect(res).to.be.true;
    });

});
