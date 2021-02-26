let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let app = require('./app');

chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("Get /posts", () => {
        it("It should get all the tasks", (done) => {
            chai.request("http://localhost:3000")
                .get('/posts')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                    done();
                })
        }) 
    })


     /**
     * Test the GET by id route
     */

     /**
     * Test the POST route
     */

     /**
     * Test the PUT route
     */

     /**
     * Test the PATCH route
     */

     /**
     * Test the DELETE route
     */
});
