const expect = require('expect'),
      {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{   
            id: '1',
            name: "Mike",
            room: 'Node Course'
        }, {   
            id: '2',
            name: "Jen",
            room: 'React course'
        }, {   
            id: '3',
            name: "Julie",
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: "Dumbledor's Army"
        };
        var returnedUser = users.addUser(user.id, user.name, user.room);

        expect(users.users[0]).toEqual(user);
    });

    it('should remove a user and return the removed user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '4';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user).toEqual({   
            id: '2',
            name: "Jen",
            room: 'React course'
        });
    });

    it('should not find a user', () => {
        var userId = '4';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for chat room', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });
});