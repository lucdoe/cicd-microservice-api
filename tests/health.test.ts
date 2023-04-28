import request from 'supertest'
import app from '../src/app'

describe('API Endpoints', () => {
  it('GET /health - should return current date and alive msg', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('Healthy')
  })
})
