import { CollateralPositionsData } from '../slices/positions/collateralPositions'
import { Address } from 'viem'
import { PriceService } from '../../services/price-service'
import { Zero } from '../../utils/bn'
import BigNumber from 'bignumber.js'


export async function getCollateralUsdBalanceByMarket(
    { collateralPositions, marketId, priceService }: {
        collateralPositions: CollateralPositionsData;
        marketId: Address;
        priceService: PriceService;
    }): Promise<BigNumber> {
    const positions = Object.values(collateralPositions[marketId]).filter(p => p.balance.gt(Zero))
    const promises = positions.map(({ priceFeed }) => priceService.getPriceFromFeed(priceFeed));
    const prices = await Promise.all(promises);
    let totalCollateralUsd: BigNumber = Zero;
    for (let index = 0; index < prices.length; index++) {
        const price = prices[index];
        const balance = positions[index].balance;
        totalCollateralUsd = totalCollateralUsd.plus(balance.times(price));
    }
    return totalCollateralUsd;
}

export async function getTotalCollateralUsdBalance(
    { collateralPositions, priceService }: {
        collateralPositions: CollateralPositionsData;
        priceService: PriceService;
    }): Promise<BigNumber> {
    const params = Object.keys(collateralPositions).map((marketId: Address) => ({ collateralPositions, marketId, priceService }));
    const promises = params.map(param => getCollateralUsdBalanceByMarket(param));
    const collaterals = await Promise.all(promises);
    return collaterals.reduce((accumulator, currentValue) => accumulator.plus(currentValue), Zero);
}

