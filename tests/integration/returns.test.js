const mongoose = require('mongoose');
const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const request = require('supertest');
const moment = require('moment');
const {Book} = require('../../models/book');

describe('/api/returns', () => {
    let customerId;
    let bookId;
    let rental;
    let server;
    let token;

    const exec = () => {

        return request(server)
        .post('/api/returns')
        .set('x-auth-token', token)
        .send({ customerId, bookId });

    };
     // open and closing sever
     beforeEach( async() => { 
         server = require('../../app');

         customerId = mongoose.Types.ObjectId();
         bookId = mongoose.Types.ObjectId();
         token = new User().generateAuthToken();
       
        
         rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '123456'
            },
            book: {
                _id: bookId,
                title: '12345',
                dailyRentRate: 2
            }
           });
           await rental.save();
        });

     afterEach( async () => {
         
       
        await Rental.remove({});
        await Book.remove({});
        await server.close(); 
         });

         it('should work!', async () => {
            
          const result = await Rental.findById(rental._id);
          expect(result).not.toBeNull();
        });

        it('should return 401 if client is not logged in', async () => {
           await Rental.remove({});
            token = '';

            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if customerID is not provided', async () => {
           await Rental.remove({});
           customerId = '';

           const res = await exec();

            expect(res.status).toBe(400);
        }, 10000);

        it('should return 400 if bookID is not provided', async () => {
            await Rental.remove({});
            bookId = '';

           const res = await exec();

            expect(res.status).toBe(400);
        }, 10000);

        it('should return 404 if no rental found for this customer/movie', async () => {
            
           await Rental.remove({});

            const res = await exec();
 
             expect(res.status).toBe(404);
         }, 10000);

         it('should return 400 if return already processed', async () => {
            
            rental.dateReturned = new Date();
            await rental.save();
 
            const res = await exec();
            expect(res.status).toBe(400);

            }, 10000);

          it('should return 200 if valid request', async () => {
              const res = await exec();
              expect(res.status).toBe(200);
          }, 10000);

          it('should set return date if input is valid', async () => {
            const res = await exec();
            
            const rentalInDb = await Rental.findById(rental._id)
            const diff = new Date() - rentalInDb.dateReturned;

            expect(diff).toBeLessThan(10 * 1000);
        }, 10000);

     
});