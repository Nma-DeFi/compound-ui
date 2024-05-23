import { Address, createPublicClient, http } from "viem";
import { ChainDataService } from "./chain-data-service";
import { cometRewardsAbi } from "../abi/cometRewardsAbi";
import { CompoundConfig } from "../compound-config";
import { cometProxy } from "../selectors/market-selector";
import { isTestnet } from "../utils/chains";
import { fromBigInt } from "../utils/bn";
import { RewardsOwedData } from "../redux/slices/rewardsOwed";

export const COMP_TOKEN = { 
    symbol: 'COMP', 
    name: 'Compound', 
    decimals: 18,
}

export class RewardsService {

    static async findAllRewards(account: Address): Promise<RewardsOwedData> {
        const chainsWithMarkets = (await ChainDataService.findAllChains()).filter(c => !isTestnet(c.id))

        let rewards = {}

        for (const chain of chainsWithMarkets) {
            
            const contracts = chain.markets.map(market => ({
                address: CompoundConfig[chain.id].contracts.cometRewards, 
                abi: cometRewardsAbi,
                functionName: 'getRewardOwed',
                args: [ cometProxy(market), account ]                
            }))

            const publicClient = createPublicClient({ chain, transport: http() })

            type RewardsOwedArray = Array<{ token: Address; owed: bigint}>

            const rewardsOwed = (await publicClient.multicall({ contracts, allowFailure: false })) as RewardsOwedArray

            let rewardsByChain = {}

            contracts.forEach((contract, i) => {
                const rewardBalance = {
                    token: rewardsOwed[i].token, 
                    balance: fromBigInt(rewardsOwed[i].owed, COMP_TOKEN.decimals)
                }
                rewardsByChain = { ...rewardsByChain, [contract.args[0]]: rewardBalance }  
            })           

            rewards = { ...rewards, [chain.id]:  rewardsByChain }
        }

        return rewards
    }

    static async claim({ chain, account, market, publicClient, walletClient }) {
        console.log(
            Date.now(),
            'RewardsService.claim',
            'chain', chain.name,
            'account', account,
            'market', market,
        )

        const { request } = await publicClient.simulateContract({
            address: CompoundConfig[chain.id].contracts.cometRewards, 
            abi: cometRewardsAbi,
            functionName: 'claim',
            args: [ market, account, true ],   
            account,
        })

        return await walletClient.writeContract(request)
    }

    static async claimAllMarkets({ chain, account, markets, publicClient, walletClient }) {
        console.log(Date.now(),
            'RewardsService.claimAllMarkets',
            'chain', chain.name,
            'markets', markets,
            'account', account,
        )

        const promises = markets.map(async (market: Address) => { 
            return await RewardsService.claim({ chain, account, market, publicClient, walletClient })
        })

        return Promise.all(promises)
    }

}