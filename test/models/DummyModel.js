process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');

var should = chai.should();

chai.use(chaiHttp);


var knex = require('../../db/knex');


describe('API Routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback()
            .then(function() {
                knex.migrate.latest()
                    .then(function() {
                        return knex.seed.run()
                            .then(function() {
                                done();
                            });
                    });
            });
    });

    afterEach(function(done) {
        knex.migrate.rollback()
            .then(function() {
                done();
            });
    });

    describe('GET /api/v1/dummy_models', function() {
        it('should return all dummy_models', function(done) {
            chai.request(server)
                .get('/api/v1/dummy_models')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(4);
                    res.body[0].should.have.property('firstname');
                    res.body[0].firstname.should.equal('Firstname1');
                    res.body[0].should.have.property('lastname');
                    res.body[0].lastname.should.equal('Last Name1');
                    res.body[0].should.have.property('genre');
                    res.body[0].genre.should.equal('Female');
                    res.body[0].should.have.property('email');
                    res.body[0].email.should.equal('dummy1@dummymail.com');
                    res.body[0].should.have.property('active');
                    res.body[0].active.should.equal(true);
                    done();
                });
        });
    });

    describe('GET /api/v1/dummy_model/:id', function() {
        it('should return a single dummy_model', function(done) {
            chai.request(server)
                .get('/api/v1/dummy_model/1')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body[0].should.have.property('firstname');
                    res.body[0].firstname.should.equal('Firstname1');
                    res.body[0].should.have.property('lastname');
                    res.body[0].lastname.should.equal('Last Name1');
                    res.body[0].should.have.property('genre');
                    res.body[0].genre.should.equal('Female');
                    res.body[0].should.have.property('email');
                    res.body[0].email.should.equal('dummy1@dummymail.com');
                    res.body[0].should.have.property('active');
                    res.body[0].active.should.equal(true);
                    done();
                });
        });
    });

    describe('POST /api/v1/dummy_model', function() {
        it('should add a dummy_model', function(done) {
            chai.request(server)
                .post('/api/v1/dummy_model')
                .send({
                    firstname: 'FirstnameX',
                    lastname: 'Last NameX',
                    genre: 'Female',
                    email: "dummyX@dummymail.com",
                    active: true
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstname');
                    res.body.firstname.should.equal('FirstnameX');
                    res.body.should.have.property('lastname');
                    res.body.lastname.should.equal('Last NameX');
                    res.body.should.have.property('genre');
                    res.body.genre.should.equal('Female');
                    res.body.email.should.equal('dummyX@dummymail.com');
                    res.body.should.have.property('active');
                    res.body.active.should.equal(true);
                    done();
                });
        });
    });

    describe('PUT /api/v1/dummy_model/:id', function() {
        it('should update a dummy_model', function(done) {
            chai.request(server)
                .put('/api/v1/dummy_model/1')
                .send({
                    genre: 'Male',
                    active: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstname');
                    res.body.firstname.should.equal('Firstname1');
                    res.body.should.have.property('lastname');
                    res.body.lastname.should.equal('Last Name1');
                    res.body.should.have.property('genre');
                    res.body.genre.should.equal('Male');
                    res.body.should.have.property('active');
                    res.body.active.should.equal(false);
                    done();
                });
        });
        it('should NOT update a dummy_model if the id field is part of the request', function(done) {
            chai.request(server)
                .put('/api/v1/dummy_model/1')
                .send({
                    id: 20,
                    genre: 'Male',
                    active: false
                })
                .end(function(err, res) {
                    res.should.have.status(422);
                    res.should.be.json; // jshint ignore:line
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.equal('You cannot update the id field');
                    done();
                });
        });
    });

    describe('DELETE /api/v1/dummy_model/:id', function() {
        it('should delete a dummy_model', function(done) {
            chai.request(server)
                .delete('/api/v1/dummy_model/1')
                .end(function(error, response) {
                    response.should.have.status(200);
                    response.should.be.json; // jshint ignore:line
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstname');
                    res.body.firstname.should.equal('Firstname1');
                    res.body.should.have.property('lastname');
                    res.body.lastname.should.equal('Last Name1');
                    res.body.should.have.property('genre');
                    res.body.genre.should.equal('Female');
                    res.body.should.have.property('active');
                    res.body.active.should.equal(true);
                    done();
                    chai.request(server)
                        .get('/api/v1/dummy_models')
                        .end(function(err, res) {
                            res.should.have.status(200);
                            res.should.be.json; // jshint ignore:line
                            res.body.should.be.a('array');
                            res.body.length.should.equal(3);
                            res.body.should.have.property('firstname');
                            res.body.firstname.should.equal('Firstname2');
                            res.body.should.have.property('lastname');
                            res.body.lastname.should.equal('Last Name2');
                            res.body.should.have.property('genre');
                            res.body.genre.should.equal('Male');
                            res.body.should.have.property('active');
                            res.body.active.should.equal(true);
                            done();
                        });
                });
        });
    });

});