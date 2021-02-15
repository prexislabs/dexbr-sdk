import { CELO as _CGLD, ChainId, cUSD as _cUSD, Pair, Price, Token, TokenAmount } from '../src'

describe('Pair', () => {
  const cUSD = new Token(ChainId.MAINNET, _cUSD[ChainId.MAINNET].address, 18, 'cUSD', 'Celo USD')
  const CGLD = new Token(ChainId.MAINNET, _CGLD[ChainId.MAINNET].address, 18, 'CGLD', 'Celo')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(_CGLD[ChainId.ALFAJORES], '100'))).toThrow(
        'CHAIN_IDS'
      )
    })
  })

  describe('#getAddress', () => {
    // TODO: Fix this test once the pair has been created on mainnet
    it('returns the correct address', () => {
      expect(Pair.getAddress(cUSD, CGLD)).toEqual('0xcB5E5C975D52ae408ea68eB84a74C229E2825e11')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).token0).toEqual(CGLD)
      expect(new Pair(new TokenAmount(CGLD, '100'), new TokenAmount(cUSD, '100')).token0).toEqual(CGLD)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).token1).toEqual(cUSD)
      expect(new Pair(new TokenAmount(CGLD, '100'), new TokenAmount(cUSD, '100')).token1).toEqual(cUSD)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '101')).reserve0).toEqual(
        new TokenAmount(CGLD, '101')
      )
      expect(new Pair(new TokenAmount(CGLD, '101'), new TokenAmount(cUSD, '100')).reserve0).toEqual(
        new TokenAmount(CGLD, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '101')).reserve1).toEqual(
        new TokenAmount(cUSD, '100')
      )
      expect(new Pair(new TokenAmount(CGLD, '101'), new TokenAmount(cUSD, '100')).reserve1).toEqual(
        new TokenAmount(cUSD, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(cUSD, '101'), new TokenAmount(CGLD, '100')).token0Price).toEqual(
        new Price(CGLD, cUSD, '100', '101')
      )
      expect(new Pair(new TokenAmount(CGLD, '100'), new TokenAmount(cUSD, '101')).token0Price).toEqual(
        new Price(CGLD, cUSD, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(cUSD, '101'), new TokenAmount(CGLD, '100')).token1Price).toEqual(
        new Price(cUSD, CGLD, '101', '100')
      )
      expect(new Pair(new TokenAmount(CGLD, '100'), new TokenAmount(cUSD, '101')).token1Price).toEqual(
        new Price(cUSD, CGLD, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(cUSD, '101'), new TokenAmount(CGLD, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(CGLD)).toEqual(pair.token0Price)
      expect(pair.priceOf(cUSD)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(_CGLD[ChainId.ALFAJORES])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '101')).reserveOf(cUSD)).toEqual(
        new TokenAmount(cUSD, '100')
      )
      expect(new Pair(new TokenAmount(CGLD, '101'), new TokenAmount(cUSD, '100')).reserveOf(cUSD)).toEqual(
        new TokenAmount(cUSD, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(CGLD, '101'), new TokenAmount(cUSD, '100')).reserveOf(_CGLD[ChainId.ALFAJORES])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).chainId).toEqual(ChainId.MAINNET)
      expect(new Pair(new TokenAmount(CGLD, '100'), new TokenAmount(cUSD, '100')).chainId).toEqual(ChainId.MAINNET)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).involvesToken(cUSD)).toEqual(true)
    expect(new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).involvesToken(CGLD)).toEqual(true)
    expect(
      new Pair(new TokenAmount(cUSD, '100'), new TokenAmount(CGLD, '100')).involvesToken(_CGLD[ChainId.ALFAJORES])
    ).toEqual(false)
  })
})
