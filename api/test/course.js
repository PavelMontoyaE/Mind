import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server.js';
import { findAll } from '../src/controller/course.controller.js';

chai.should();
chai.use(chaiHTTP);

describe('Courses', function () {
  after(function (done) {
    server.close();
    done();
  });

  describe('Test route api/v2/session', function () {
    it('It should return 200 and the token', function (done) {
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

  describe('Course controller', function () {
    it('it should return an array', function (done) {
      let req = { query: {} };
      let res = {
        send: (data) => {
          data.should.be.a('array');
          done();
        }
      };
      findAll(req, res);
    });
  });
});
