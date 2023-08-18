const request = require('supertest');
const yup = require('yup');
const { CUSTOMER } = require('../src/constants');
const { sequelize } = require('../src/models');
const mongoose = require('../src/dbMongo/mongoose');
const app = require('../src/app')();

const appRequest = request(app);

function createUser() {
  return {
    firstName: 'Test',
    lastName: 'User',
    displayName: 'TestUser',
    password: 'h43yr0-923h79023hdhr',
    email: `testuser-${Date.now()}@test.mail`,
    role: CUSTOMER
  }
}

const USER_LOGIN_SCHEMA = yup.object({
  token: yup.string().required()
});

afterAll(async () => {
  await sequelize.close();
  await mongoose.connection.close();
});

describe('registration tests', () => {

  test('user with correct data must be created successfully', async () => {
    const user = createUser();
    const response = await appRequest.post('/registration').send(user);

    expect(response.statusCode).toBe(201);
    expect(USER_LOGIN_SCHEMA.isValidSync(response.body)).toBe(true);
  });

  test('user with incorrect data must not be created successfully', async () => {
    const response = await appRequest.post('/registration').send({});

    expect(response.statusCode).toBe(400);
    expect(USER_LOGIN_SCHEMA.isValidSync(response.body)).toBe(false);
  });

  test('user with non-unique email must not be created successfuly', async () => {
    const response = await appRequest.post('/registration').send({
      firstName: 'Test',
      lastName: 'User',
      displayName: 'TestUser',
      password: 'h43yr0-923h79023hdhr',
      email: `buyer@gmail.com`,
      role: CUSTOMER
    });

    expect(response.statusCode).toBe(409);
  });
});