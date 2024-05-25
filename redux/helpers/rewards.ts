import BigNumber from "bignumber.js"
import { RewardsOwedData } from "../slices/rewardsOwed"
import { Zero } from "../../utils/bn"
import { PriceService } from "../../services/price-service"
import { COMP_TOKEN } from "../../services/rewards-service"

export async function getTotalRewardsUsd(
    { rewardsOwed } : {
        rewardsOwed: RewardsOwedData
    }): Promise<BigNumber> {
    const compPrice = await (new PriceService()).getPriceFromSymbol(COMP_TOKEN.symbol)
    return getTotalRewards({ rewardsOwed }).times(compPrice)
}

export function getTotalRewards(
    { rewardsOwed } : {
        rewardsOwed: RewardsOwedData
    }): BigNumber {
    const rewardsByChain : Array<BigNumber> = Object.keys(rewardsOwed).map(chain => getTotalRewardsByChain({ rewardsOwed, chainId: Number(chain) }))
    return rewardsByChain.reduce((accumulator, currentValue) => accumulator.plus(currentValue), Zero)
}

export async function getTotalRewardsUsdByChain(
    { rewardsOwed, chainId } : {
        rewardsOwed: RewardsOwedData
        chainId: number
    }): Promise<BigNumber> {
    const compPrice = await (new PriceService()).getPriceFromSymbol(COMP_TOKEN.symbol)
    return getTotalRewardsByChain({ rewardsOwed, chainId }).times(compPrice)
}

export function getTotalRewardsByChain(
    { rewardsOwed, chainId } : {
        rewardsOwed: RewardsOwedData
        chainId: number
    }): BigNumber {
    const rewardsByMarket : Array<BigNumber> = Object.values(rewardsOwed[chainId])
        .filter(rewardByMarket => Boolean(rewardByMarket))
        .map(rewardByMarket => rewardByMarket.balance)
    return rewardsByMarket.reduce((accumulator, currentValue) => accumulator.plus(currentValue), Zero)
}