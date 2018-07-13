const expect = require('chai').expect;
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate correct message object', () => {
        let from = 'John';
        let text = 'Some msg'
        let message = generateMessage(from, text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({from,text});
    });
});

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        let from = 'Jack';
        let latitude = 123;
        let longitude = 456;
        let url = 'https://www.google.com/maps?q=123,456'
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({from, url});
    });
});
