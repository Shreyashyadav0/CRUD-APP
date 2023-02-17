process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
// let should = chai.should();

chai.use(chaiHttp);

describe('notes', () => {
    beforeEach((done) => {
        // notes.remove({}, (err) => { 
        //    done();           
        // });        
    });
  describe('/GET notes', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST notes', () => {
      it('it should not POST a notes without pages field', (done) => {
          let notes = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954
          }
        chai.request(server)
            .post('/notes')
            .send(notes)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });
});