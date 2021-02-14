import JSBI from 'jsbi'

import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Celo, including all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is CGLD.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly CGLD_CURRENCY: Currency = new Currency(18, 'CGLD', 'Celo')

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.CGLD_CURRENCY`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

const CGLD_CURRENCY = Currency.CGLD_CURRENCY
export { CGLD_CURRENCY }
