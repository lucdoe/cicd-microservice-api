import request from 'supertest'
import app from '../src/app'

describe('API Endpoints', () => {
  it('GET / - should return a greeting', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toEqual(
      'Hello, from a Microservice in Kubernetes!',
    )
  })
})
