import { Address } from 'viem'
import { Zero, bnf } from '../../utils/bn'
import { BorrowPositionsData } from '../slices/positions/borrowPositions'
import { CollateralPositionsData } from '../slices/positions/collateralPositions'
import { PriceService } from '../../services/price-service'
import BigNumber from 'bignumber.js'

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

export async function getTotalBorrowingsUsdBalance(
  { borrowPositions, priceService } : {
      borrowPositions: BorrowPositionsData
      priceService: PriceService
  }): Promise<BigNumber> {

  const positions = Object.values(borrowPositions).filter(p => p.borrowBalance.gt(Zero))
  const prices = await priceService.getAllPricesFromFeeds(positions.map(p => p.priceFeed))

  let totalBorrowingsUsd: BigNumber = Zero
  
  for (let index = 0; index < positions.length; index++) {
      const price = prices[index]
      const balance = positions[index].borrowBalance
      totalBorrowingsUsd = totalBorrowingsUsd.plus(balance.times(price))
  }    

  return totalBorrowingsUsd
}

export function log(chainId: number, positions: BorrowPositionsData) {
  const formatter = ({ baseToken, borrowBalance }) => `${baseToken.name} : ${bnf(borrowBalance)}`
  console.log(Date.now(), 'borrowPositions', chainId, Object.values(positions).map(formatter))
}
