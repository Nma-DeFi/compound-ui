import { Address, createPublicClient, http } from "viem";
import { ChainDataService } from "./chain-data-service";
import { cometRewardsAbi } from "../abi/cometRewardsAbi";
import { CompoundConfig } from "../compound-config";
import { cometProxy } from "../selectors/market-selector";

export class RewardsService {

    publicClient

    constructor({ publicClient }) {
        this.publicClient = publicClient
    }

    async findAllRewards(account: Address) {
        const chainsWithMarkets = await ChainDataService.findAllChains()

        for (const chain of chainsWithMarkets.filter(c => !c.isTestnet)) {
            console.log('findAllRewards', account, chain)
            
            const rewardsContract = { 
                address: CompoundConfig[chain.id].contracts.cometRewards, 
                abi: cometRewardsAbi 
            }
            //console.log('findAllRewards rewardsContract', rewardsContract)

            const contracts = chain.markets.map(market => ({
                ...rewardsContract,
                functionName: 'getRewardOwed',
                args: [ cometProxy(market), account ]                
            }))

            //console.log('findAllRewards contracts', contracts)

            const publicClient = createPublicClient({ chain, transport: http() })

            try {
                const rewards = await publicClient.multicall({ contracts, allowFailure: false })
                console.log('findAllRewards result', rewards)
            } catch (e) {
                console.error('findAllRewards error', e, chain.name, contracts)
            }
        }
    }

}