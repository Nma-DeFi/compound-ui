import { SupplyPositionsData } from '../slices/positions/supplyPositions';
import { Zero, bnf } from '../../utils/bn';
import { PriceService } from '../../services/price-service';
import BigNumber from 'bignumber.js';

export async function getTotalEarningsUsdBalance(
  { supplyPositions, priceService } : {
    supplyPositions: SupplyPositionsData
      priceService: PriceService
  }): Promise<BigNumber> {

  const positions = Object.values(supplyPositions).filter(p => p.supplyBalance.gt(Zero))
  const prices = await priceService.getAllPricesFromFeeds(positions.map(p => p.priceFeed))

  let totalEarningsUsd: BigNumber = Zero;
  for (let index = 0; index < positions.length; index++) {
      const price = prices[index]
      const balance = positions[index].supplyBalance
      totalEarningsUsd = totalEarningsUsd.plus(balance.times(price))
  }    

  return totalEarningsUsd
}

export function log(chainId: number, positions: SupplyPositionsData) {
  const formatter = ({ baseToken, supplyBalance }) => `${baseToken.name} : ${bnf(supplyBalance)}`;
  console.log(Date.now(), 'supplyPositions', chainId, Object.values(positions).map(formatter));
}
