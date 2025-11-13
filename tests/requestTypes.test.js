const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const connectDB = require('../src/config/database');
const RequestType = require('../src/models/RequestType');

beforeAll(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/support-api-test';
  await connectDB(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Health', () => {
  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

describe('Request Types', () => {
  let id;
  beforeAll(async () => {
    const doc = await RequestType.create({
      code: 'TEST_CODE',
      name: 'Test',
      description: 'desc',
      priority: 'low',
      category: 'test',
      estimatedResponseTime: 1
    });
    id = doc._id.toString();
  });

  test('GET /api/request-types returns array', async () => {
    const res = await request(app).get('/api/request-types');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/request-types/:id returns item', async () => {
    const res = await request(app).get(`/api/request-types/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('code', 'TEST_CODE');
  });

  test('POST /api/request-types creates', async () => {
    const payload = {
      code: 'POST_TEST',
      name: 'Post Test',
      description: 'desc',
      priority: 'medium',
      category: 'test',
      estimatedResponseTime: 2
    };
    const res = await request(app).post('/api/request-types').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('code', 'POST_TEST');
  });
});
