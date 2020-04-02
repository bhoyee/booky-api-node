const request = require('supertest');
const {Category} = require('../../models/category');
const {User} = require('../../models/user');
const mongoose = require('mongoose')

let server;

describe('/api/categories', () => {
    // open and closing sever
    beforeEach(() => { server = require('../../app');})
    afterEach( async () => {
         
         //clear all documents
         await Category.remove({});
         await server.close();
        });

    describe('GET /', () => {
         
        it('should return all categories', async () => {
            await Category.remove({});
            await Category.collection.insertMany([
                {name: "Category1"},
                {name: "category2"}
            ]);
            const res = await request(server).get('/api/categories');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);  
            expect(res.body.some(g => g.name === 'category2')).toBeTruthy();     
        });
    });
    

    describe('GET/:id', () => {
        it('should return a category if valid Id is passed', async () => {
            // populate the db
            const category = new Category({
                name:'bhoyee'
            });
            await category.save();
            const res = await request(server).get('/api/categories/' + category._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', category.name);
        });

        it('should return 404 if no category with the given id exists', async() => {
            let id = 1;
            const res = await request(server).get(`/api/categories/${id}`);
            expect(res.status).toBe(404);

        });

        it('should return 404 if invalid id is passed', async() => {
            let id = mongoose.Types.ObjectId() ;
            const res = await request(server).get('/api/categories/' + id);
            expect(res.status).toBe(404);

        });
    });
    
    describe('POST /', () => {

        let token;
        let name ;
        const exec = async () => {
            return await request(server)
                .post('/api/categories')
                .set('x-auth-token', token)
                .send({name: name });
        }
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'bhoyee1';
        })

        it('should return 401 if client is not logged in', async () => {
           token ='';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if category is less than 5 characters', async () => {
             name = '1234';
             const res = await exec();
              expect(res.status).toBe(400);
          });
        
          it('should return 400 if category is more than 255 characters', async () => {
           
            name = new Array(257).join('a');
            const res = await exec();
              expect(res.status).toBe(400);
          });

          it('should save the category if its valid', async () => {
           
            await exec();

              const category = await Category.find({name: 'bhoyee1'});
              expect(category).not.toBeNull();
          });

          it('should return the category if its valid', async () => {
           
            const res = await exec();

               expect(res.body).toHaveProperty('_id');
               expect(res.body).toHaveProperty('name', 'bhoyee1')
          });
    });

    describe('PUT/:id', () => {

    });
});