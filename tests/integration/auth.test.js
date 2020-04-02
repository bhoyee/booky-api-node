const request = require('supertest');
const {User} = require('../../models/user');
const {Category} = require('../../models/category');

describe('auth middleware', () => {

     // open and closing sever
     beforeEach(() => { server = require('../../app');})
     afterEach( async () => {
          //clear all documents
          await Category.remove({});
          await server.close();
    });

    let token;

    const exec = () => {
     return request(server)
        .post('/api/categories')
        .set('x-auth-token', token)
        .send({ name: 'bhoyee1'}) ; 
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        
        const res = await exec();
        expect(res.status).toBe(200);
    });

});