import {
  featureController,
  upgradeAccountRoute,
} from '../../src/controllers/featureControllers'

describe('Feature Controller', () => {
  it('should return 200', async () => {
    const mockRequest: any = {}
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await featureController(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
  })

  it('should return feature array', async () => {
    const mockRequest: any = {}
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await featureController(mockRequest, mockResponse)
    expect(mockResponse.json).toHaveBeenCalledWith([
      'feature1',
      'feature2',
      'feature3',
    ])
  })
})

jest.mock('../../src/services/payment', () => {
  const fakePaymentService = {
    chargeUserMonthly: jest.fn(async () => true),
  }
  return {
    getPaymentService: jest.fn(() => fakePaymentService),
  }
})

import {getPaymentService} from '../../src/services/payment'

describe('upgradeAccountRoute', () => {
  it('should charge the user for the premium plan', async () => {
    const userId = '123-456-789-012'
    const premiumPlanCost = 100
    const expectedResult = true
    const mockRequest: any = {}
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const upgradeAccount = upgradeAccountRoute()
    await upgradeAccount(mockRequest, mockResponse)

    expect(getPaymentService).toHaveBeenCalled()
    expect(getPaymentService().chargeUserMonthly).toHaveBeenCalledWith(
      userId,
      premiumPlanCost,
    )
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResult)
  })
})
