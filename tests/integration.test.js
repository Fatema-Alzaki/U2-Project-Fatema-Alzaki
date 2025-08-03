const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Integration - User & Project', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const res = await request(app).post('/api/users/signup').send({
      name: 'IntegrationUser',
      email: 'intuser@example.com',
      password: 'integration123'
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('user should sign up and view projects', async () => {
    const createProject = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tree Planting',
        issueType: 'air',
        equipment: 'shovel, water',
        location: 'Manama',
        volunteerLimit: 3
      });
    expect(createProject.statusCode).toBe(201);

    const viewProjects = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(viewProjects.statusCode).toBe(200);
    expect(Array.isArray(viewProjects.body)).toBe(true);
  });
});