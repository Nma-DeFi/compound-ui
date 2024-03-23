import { Address } from 'viem'
import { Zero, bnf } from '../../utils/bn'
import { BorrowPositionsData } from '../slices/positions/borrowPositions'
import { CollateralPositionsData } from '../slices/positions/collateralPositions'
import { PriceService } from '../../services/price-service'

export async function getBorrowCapacity({ marketId, borrowPositions, collateralPositions, priceService } : {
    marketId: Address
    borrowPositions: BorrowPositionsData
    collateralPositions: CollateralPositionsData
    priceService: PriceService
  }) {

  const { borrowBalance, priceFeed: baseTokenPriceFeed } = borrowPositions[marketId]
  const collatPositions = Object.values(collateralPositions[marketId]).filter(p => p.balance.gt(Zero))
  const collatPriceFeeds = collatPositions.map(p => p.priceFeed)

  const prices = await priceService.getAllPricesFromFeeds([baseTokenPriceFeed, ...collatPriceFeeds])

  let borrowCapacity = borrowBalance.times(-1).times(prices[0])

  for (let index = 0; index < collatPositions.length; index++) {
    const price = prices[index + 1]
    const balance = collatPositions[index].balance
    const factor = collatPositions[index].collateralFactor
    borrowCapacity = borrowCapacity.plus(balance.times(price).times(factor))
  }

  return borrowCapacity
}

export function log(chainId: number, positions: BorrowPositionsData) {
  const formatter = ({ baseToken, borrowBalance }) => `${baseToken.name} : ${bnf(borrowBalance)}`
  console.log(Date.now(), 'borrowPositions', chainId, Object.values(positions).map(formatter))
}
