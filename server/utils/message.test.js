const expect = require('chai').expect;
const {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let from = 'John';
        let text = 'Some msg'
        let message = generateMessage(from, text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({from,text});
    });
});
