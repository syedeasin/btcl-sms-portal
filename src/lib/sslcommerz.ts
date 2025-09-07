interface SSLCommerzConfig {
  store_id: string
  store_passwd: string
  is_live: boolean
}

interface PaymentData {
  amount: number
  currency: string
  tran_id: string
  product_name: string
  product_category: string
  cus_name: string
  cus_email: string
  cus_phone: string
  cus_add1: string
  cus_city: string
  cus_country: string
  success_url: string
  fail_url: string
  cancel_url: string
  ipn_url?: string
}

interface SSLCommerzResponse {
  status: string
  failedreason?: string
  sessionkey?: string
  gw?: any
  redirectGatewayURL?: string
  directPaymentURLBank?: string
  directPaymentURLCard?: string
  directPaymentURL?: string
  redirectGatewayURLFailed?: string
  GatewayPageURL?: string
  [key: string]: any
}

class SSLCommerzPayment {
  private config: SSLCommerzConfig
  private baseUrl: string

  constructor(config: SSLCommerzConfig) {
    this.config = config
    this.baseUrl = config.is_live 
      ? 'https://securepay.sslcommerz.com'
      : 'https://sandbox.sslcommerz.com'
  }

  async initiatePayment(paymentData: PaymentData): Promise<SSLCommerzResponse> {
    const data = {
      store_id: this.config.store_id,
      store_passwd: this.config.store_passwd,
      total_amount: paymentData.amount.toString(),
      currency: paymentData.currency,
      tran_id: paymentData.tran_id,
      success_url: paymentData.success_url,
      fail_url: paymentData.fail_url,
      cancel_url: paymentData.cancel_url,
      ipn_url: paymentData.ipn_url || '',
      product_name: paymentData.product_name,
      product_category: paymentData.product_category,
      product_profile: 'general',
      cus_name: paymentData.cus_name,
      cus_email: paymentData.cus_email,
      cus_add1: paymentData.cus_add1,
      cus_city: paymentData.cus_city,
      cus_country: paymentData.cus_country,
      cus_phone: paymentData.cus_phone,
      shipping_method: 'NO',
      multi_card_name: 'mastercard,visacard,amexcard',
      value_a: '',
      value_b: '',
      value_c: '',
      value_d: ''
    }

    try {
      const response = await fetch(`${this.baseUrl}/gwprocess/v4/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: SSLCommerzResponse = await response.json()
      return result
    } catch (error) {
      console.error('SSL Commerz payment initiation error:', error)
      throw error
    }
  }

  async validateTransaction(valId: string, storeId?: string, storePassword?: string): Promise<any> {
    const params = new URLSearchParams({
      val_id: valId,
      store_id: storeId || this.config.store_id,
      store_passwd: storePassword || this.config.store_passwd,
      format: 'json'
    })

    try {
      const response = await fetch(`${this.baseUrl}/validator/api/validationserverAPI.php?${params}`, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('SSL Commerz transaction validation error:', error)
      throw error
    }
  }

  generateTransactionId(prefix: string = 'BTCL'): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `${prefix}_${timestamp}_${random}`
  }
}

export { SSLCommerzPayment, type PaymentData, type SSLCommerzResponse }

// Helper function to create SSL Commerz instance
export function createSSLCommerzInstance(): SSLCommerzPayment {
  const config: SSLCommerzConfig = {
    store_id: process.env.SSLCOMMERZ_STORE_ID || '',
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || '',
    is_live: process.env.SSLCOMMERZ_IS_LIVE === 'true'
  }

  if (!config.store_id || !config.store_passwd) {
    throw new Error('SSL Commerz configuration is missing. Please check your environment variables.')
  }

  return new SSLCommerzPayment(config)
}