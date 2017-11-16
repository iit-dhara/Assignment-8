process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../app/models/users');
let Reminder = require('../app/models/reminders');
let App = require('../app');

let chai = require('chai');
let chaiHttp = require('chai-http');

//let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
            chai.request(App)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.should.be.json;
                res.body[1].should.have.property('name');
                res.body[2].should.have.property('email');
              done();
            });
      });
  });

  describe('/POST user', () => {
      it('it should POST a user', (done) => {
        let user = {
            name: '',
            email: 'ben@gmail.com'
            }
            chai.request(App)
            .post('/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                // res.should.not.eql('name',null);
                res.body.should.have.property('message').eql('User successfully added!');
              done();
            });
      });
  });  

  describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
        let user = new User({name: 'Ben', email: 'ben@gmail.com' });
        user.save((err, user) => {
            chai.request(App)
            .get('/user/' + user.id)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.be.json;        
                res.body.should.have.property('_id').eql(user.id);
              done();
            });
        });
      }); 
  }); 

  describe('/DELETE/:id user', () => {
      it('it should DELETE a user by the given id', (done) => {
        let user = new User({name: 'Ben', email: 'ben@gmail.com' });
        user.save((err, user) => {
            chai.request(App)
            .delete('/user/' + user.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.be.json;  
                res.body.should.have.property('message').eql('User successfully deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);      
              done();
            });
        });
      }); 
  }); 

describe('/GET reminder', () => {
      it('it should GET the all reminder', (done) => {
            chai.request(App)
            .get('/reminder')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                // res.body[1].should.have.property('title');
                // res.body[2].should.have.property('description');
                
              done();
            });
      });
  });

describe('/POST reminder', () => {
      it('it should POST a reminder', (done) => {
        let reminder = {
            title: 'Sixth Reminder',
            description: 'This is sixth reminder'
            }
            chai.request(App)
            .post('/reminder')
            .send(reminder)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message').eql('Reminder successfully added!');
              done();
            });
      });
  });  

  describe('/GET/:id reminder', () => {
      it('it should GET a reminder by the given id', (done) => {
        let reminder = new Reminder({title: 'Sixth Reminder', description: 'This is sixth reminder'});
        reminder.save((err, reminder) => {
            chai.request(App)
            .get('/reminder/' + reminder.id)
            .send(reminder)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.be.json;        
                res.body.should.have.property('_id').eql(reminder.id);
              done();
            });
        });
      }); 
  }); 

describe('/DELETE/:id reminder', () => {
      it('it should DELETE a reminder by the given id', (done) => {
        let reminder = new Reminder({title: 'Sixth Reminder', description: 'This is sixth reminder'});
        reminder.save((err, reminder) => {
            chai.request(App)
            .delete('/reminder/' + reminder.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.should.be.json; 
                res.body.should.have.property('message').eql('Reminder successfully deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);        
              done();
            });
        });
      }); 
  });

describe('/DELETE all reminders', () => {
      it('it should DELETE all reminders', (done) => {
            chai.request(App)
            .delete('/reminder')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message').eql('All Reminders successfully deleted!');
              done();
            });
      });
});  








