import { Zero, bnf } from '../../utils/bn'
import { BorrowPositionsData } from '../slices/positions/borrowPositions'
import { CollateralPositionsData } from '../slices/positions/collateralPositions'
import { PriceService } from '../../services/price-service'
import BigNumber from 'bignumber.js'
import { Market } from '../../types'
import { getPriceFeed } from '../../utils/markets'

export async function getLiquidationRisk({ chainId, market, borrowPositions, collateralPositions, priceService } : {
    chainId: number
    market: Market
    borrowPositions: BorrowPositionsData
    collateralPositions: CollateralPositionsData
    priceService: PriceService
  }) {

  const { borrowBalance: borrowAmount } = borrowPositions[market.cometProxy]

  return getLiquidationRiskByBorrowAmount({ chainId, market, collateralPositions, priceService, borrowAmount })
}

export async function getLiquidationRiskByBorrowAmount({ chainId, market, collateralPositions, priceService, borrowAmount } : {
  chainId: number
  market: Market
  collateralPositions: CollateralPositionsData
  priceService: PriceService
  borrowAmount: BigNumber
}) {

  const marketId = market.cometProxy
  const collatPositions = Object.values(collateralPositions[marketId]).filter(p => p.balance.gt(Zero))
  const collatPriceFeeds = collatPositions.map(p => p.priceFeed)
  const borrowTokenPriceFeed = getPriceFeed(market, chainId)

  const prices = await priceService.getAllPricesFromFeeds([borrowTokenPriceFeed, ...collatPriceFeeds])

  const borrowCurrent = borrowAmount.times(prices[0])

  let borrowMax = Zero

  for (let index = 0; index < collatPositions.length; index++) {
    const price = prices[index + 1]
    const balance = collatPositions[index].balance
    const factor = collatPositions[index].liquidationThreshold
    borrowMax = borrowMax.plus(balance.times(price).times(factor))
  }

  console.log('getLiquidationRiskByBorrowBalance', 
    'borrowCurrent', bnf(borrowCurrent), 
    'borrowMax', bnf(borrowMax), 
    'liquidationRisk', borrowCurrent.div(borrowMax).toNumber())

  return borrowCurrent.div(borrowMax).toNumber()
}

