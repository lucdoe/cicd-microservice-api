import {
  sanitizeBodys,
  sanitizeHeadersAndQueryParams,
} from '../../src/middlewares/sanitization'

describe('sanitizeHeadersAndQueryParams middleware', () => {
  it('should sanitize headers, query params, and params', async () => {
    const mockRequest: any = {
      headers: {
        'x-foo': 'bar',
      },
      query: {
        foo: 'bar',
      },
      params: {
        id: '123',
      },
    }
    const mockResponse: any = {}
    const mockNext = jest.fn()

    await sanitizeHeadersAndQueryParams(mockRequest, mockResponse, mockNext)

    expect(mockRequest.headers['x-foo']).toEqual('bar')
    expect(mockRequest.query.foo).toEqual('bar')
    expect(mockRequest.params.id).toEqual('123')
    expect(mockNext).toHaveBeenCalled()
  })
})

describe('sanitizeBodys middleware', () => {
  it('should sanitize the body', async () => {
    const mockRequest: any = {
      body: {
        foo: 'bar',
      },
    }
    const mockResponse: any = {}
    const mockNext = jest.fn()

    await sanitizeBodys(mockRequest, mockResponse, mockNext)

    expect(mockRequest.body.foo).toEqual('bar')
    expect(mockNext).toHaveBeenCalled()
  })
})
