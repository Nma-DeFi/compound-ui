import { Zero, bn, bnf } from '../../utils/bn'
import { BorrowPositionsData } from '../slices/positions/borrowPositions'
import { CollateralPositionsData } from '../slices/positions/collateralPositions'
import { PriceService } from '../../services/price-service'
import BigNumber from 'bignumber.js'
import { Market, Token } from '../../types'
import { getPriceFeed } from '../../utils/markets'
import { cloneCollateralPositions } from './collateral'
import { cometProxy } from '../../selectors/market-selector'

export async function getLiquidationRisk({ chainId, market, borrowPositions, collateralPositions, priceService } : {
    chainId: number
    market: Market
    borrowPositions: BorrowPositionsData
    collateralPositions: CollateralPositionsData
    priceService: PriceService
  }): Promise<number> {

  const { borrowBalance: borrowAmount } = borrowPositions[market.cometProxy]

  return getLiquidationRiskByBorrowAmount({ chainId, market, collateralPositions, priceService, borrowAmount })
}

export async function getLiquidationRiskByBorrowAmount({ chainId, market, collateralPositions, priceService, borrowAmount } : {
  chainId: number
  market: Market
  collateralPositions: CollateralPositionsData
  priceService: PriceService
  borrowAmount: BigNumber
}) : Promise<number> {
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

  return borrowCurrent.div(borrowMax).times(100).toNumber()
}

export async function getLiquidationRiskByBorrowAmountAdded({chainId, market, collateralPositions, borrowPositions, priceService, amountAdded}) {
  const { borrowBalance } = borrowPositions[cometProxy(market)]
  const borrowAmount = borrowBalance.plus(amountAdded)

  return await getLiquidationRiskByBorrowAmount({ chainId, market, collateralPositions, priceService, borrowAmount })
}

export async function getLiquidationRiskByCollateralWithdrawal({ chainId, market, borrowPositions, collateralPositions, priceService, collateral, amount } : {
  chainId: number
  market: Market
  borrowPositions: BorrowPositionsData
  collateralPositions: CollateralPositionsData
  priceService: PriceService
  collateral: Token
  amount: BigNumber
}): Promise<number> {
  const modifiedCollateralPositions = cloneCollateralPositions(collateralPositions)

  const oldBalance: BigNumber = modifiedCollateralPositions[market.cometProxy][collateral.address].balance
  const newBalance: BigNumber = oldBalance.minus(amount)

  modifiedCollateralPositions[market.cometProxy][collateral.address].balance = BigNumber.max(0, newBalance)

  return getLiquidationRisk({ chainId, market, priceService, borrowPositions, collateralPositions: modifiedCollateralPositions })
}

