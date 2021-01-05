import chai from 'chai';
import chaiHTTP from 'chai-http';
import server, { sequelize } from '../server.js';
import seeding from '../src/seeders/index.js';

chai.should();
chai.use(chaiHTTP);

describe('Course API', function () {
  before(function (done) {
    this.timeout(10000); // A very long environment setup.
    setTimeout(done, 2500);
  });

  after(function (done) {
    server.close();
    done();
  });

  describe('Test route api/v2/session', function () {
    it('It should return 200 and the token', function (done) {
      const queryInterface = sequelize.getQueryInterface();
      seeding.up(queryInterface, sequelize);

      chai
        .request(server)
        .post('/api/v2/session')
        .send({
          email: 'pmontoya@arkusnexus.com',
          password: 'arkus@123',
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  describe('Test route api/v2/courses', function () {
    it('It should return 200 and all the courses', function (done) {
      chai
        .request(server)
        .get('/api/v2/courses')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });

    it('It should return 401 - couses/{id} without headers', function (done) {
      chai
        .request(server)
        .get('/api/v2/courses/1')
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });

      it('It should return 200 and a course', function (done) {
        chai
          .request(server)
          .get('/api/v2/courses/1')
          .set({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4MzMzNDE4fQ.DPQCf4jj4OC_0wyksmFRhotVvKlf0KgUc4Osx9x_cwo',
          })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();
          });
      });
    });
  });
});
