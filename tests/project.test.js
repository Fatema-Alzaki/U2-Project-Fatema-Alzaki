const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const User = require('../models/User');

describe('Project API', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const res = await request(app).post('/api/users/signup').send({
      name: 'ProjectUser',
      email: 'projuser@example.com',
      password: 'projpassword'
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Clean Beach',
        issueType: 'marine',
        equipment: 'bags, gloves',
        location: 'Bahrain',
        volunteerLimit: 5
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Clean Beach');
  });
});