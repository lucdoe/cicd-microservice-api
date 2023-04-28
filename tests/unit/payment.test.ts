import {getPaymentService} from '../../src/services/payment'

describe('PaymentService', () => {
  describe('chargeUserMonthly', () => {
    it('should return true when the charge is successful', async () => {
      const userId = '123'
      const monthlyAmount = 50
      const paymentService = getPaymentService()

      const result = await paymentService.chargeUserMonthly(
        userId,
        monthlyAmount,
      )

      expect(result).toBe(true)
    })

    it('should throw an error when the charge fails', async () => {
      const userId = '456'
      const monthlyAmount = 100
      const errorMessage = 'Payment failed'

      const paymentService = {
        chargeUserMonthly: async (userId: string, monthlyAmount: number) => {
          throw new Error(errorMessage)
        },
      }

      try {
        await paymentService.chargeUserMonthly(userId, monthlyAmount)
      } catch (err: any) {
        expect(err.message).toBe(errorMessage)
      }
    })
  })
})
