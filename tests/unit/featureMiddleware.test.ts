// test feature middleware

import {featureMiddleware} from '../../src/middlewares/featureMiddlewares'

describe('Feature Middleware', () => {
  it('should log featureMiddleware', async () => {
    const mockRequest: any = {}
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const mockNext = jest.fn()

    const consoleSpy = jest.spyOn(console, 'log')
    await featureMiddleware(mockRequest, mockResponse, mockNext)

    expect(consoleSpy).toHaveBeenCalledWith('featureMiddleware')

    consoleSpy.mockRestore()
  })

  it('should call next', async () => {
    const mockRequest: any = {}
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const mockNext = jest.fn()
    await featureMiddleware(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })
})
