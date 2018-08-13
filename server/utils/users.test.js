const expect = require('chai').expect;
const {Users} = require('./users');

describe('Users', () => {

    it('it should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Alexis',
            room: 'The office fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equals([user]);
    });

});
