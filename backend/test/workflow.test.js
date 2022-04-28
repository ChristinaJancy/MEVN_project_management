const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);


//test whole workflow
describe('Workflow', () => {
    //test workflow
    it('Create user, login and create project with columns and tasks', (done) => {
        const user = {
            name: 'testtt',
            password: 'testtt',
            email: 'testttt',
            avatarPicture: 'test'
        }

        chai.request(server)
            .post('/api/users/register')
            .send(user)
            .end((err, res) => {

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('New user created.😊');
                expect(res.body).to.have.property('newUser');
                expect(res.body.newUser).to.have.property('_id');
                expect(res.body.newUser).to.have.property('name');
                expect(res.body.newUser).to.have.property('email');
                expect(res.body.newUser).to.have.property('password');
                expect(res.body.newUser).to.have.property('avatarPicture');
                expect(res.body.newUser).to.have.property('initials');
                expect(res.body.newUser).to.have.property('roles');

                chai.request(server)
                    .post('/api/users/login')
                    .send({
                        email: 'testttt',
                        password: 'testtt'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal('User logged in 😊');
                        expect(res.body.data).to.have.property('token');
                        let token = res.body.data.token;

                        const projectTag = {
                            name: 'testtt',
                            color: '#fff'
                        }
                        chai.request(server)
                            .post('/api/project-tags')
                            .set({ "auth-token": token })
                            .send(projectTag)
                            .end((err, res) => {
                                expect(res).to.have.status(200);
                                expect(res.body).to.have.property('message');
                                expect(res.body.message).to.equal('New project tag created.😊');
                                expect(res.body).to.have.property('newtag');
                                expect(res.body.newtag).to.have.property('_id');
                                expect(res.body.newtag).to.have.property('name');
                                expect(res.body.newtag).to.have.property('color');

                                const project = {
                                    title: 'testtt',
                                    description: 'testtt',
                                    tags: [res.body.newtag._id],
                                    deadline: '01-01-2000'
                                }
                                chai.request(server)
                                    .post('/api/projects')
                                    .set({ "auth-token": token })
                                    .send(project)
                                    .end((err, res) => {
                                        expect(res).to.have.status(200);
                                        expect(res.body).to.have.property('message');
                                        expect(res.body.message).to.equal('New project created.😊');
                                        expect(res.body).to.have.property('newproject');
                                        expect(res.body.newproject).to.have.property('_id');
                                        expect(res.body.newproject).to.have.property('title');
                                        expect(res.body.newproject).to.have.property('description');
                                        expect(res.body.newproject).to.have.property('tags');
                                        expect(res.body.newproject).to.have.property('deadline');

                                        const column = {
                                            title: 'testtt',
                                            tasks: []
                                        }
                                        chai.request(server)
                                            .post('/api/columns')
                                            .set({ "auth-token": token })
                                            .send(column)
                                            .end((err, res) => {
                                                expect(res).to.have.status(200);
                                                expect(res.body).to.have.property('message');
                                                expect(res.body.message).to.equal('New column created.😊');
                                                expect(res.body).to.have.property('newcolumn');
                                                expect(res.body.newcolumn).to.have.property('_id');
                                                expect(res.body.newcolumn).to.have.property('title');
                                                expect(res.body.newcolumn).to.have.property('tasks');

                                                const task = {
                                                    name: 'testtt',
                                                    description: 'testtt',
                                                    deadline: '01-01-2000',
                                                    status: 'todo',
                                                }
                                                chai.request(server)
                                                    .post('/api/tasks')
                                                    .set({ "auth-token": token })
                                                    .send(task)
                                                    .end((err, res) => {
                                                        expect(res).to.have.status(200);
                                                        expect(res.body).to.have.property('message');
                                                        expect(res.body.message).to.equal('New task created.😊');
                                                        expect(res.body).to.have.property('newtask');
                                                        expect(res.body.newtask).to.have.property('_id');
                                                        expect(res.body.newtask).to.have.property('name');
                                                        expect(res.body.newtask).to.have.property('description');
                                                        done();
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
});