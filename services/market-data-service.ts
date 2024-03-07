import { GraphQLClient } from "graphql-request";
import { CompoundConfig} from "../compound-config";
import { Sdk, getSdk } from "../graphql/generated/sdk";
import { percentScale, presentBaseValue, tokenScale } from "../comet"
import { baseTokenDecimals } from "../selectors/market-selector";

export class MarketDataService {

    subgraph: Sdk;

    constructor({ chainId }) {
        const endpoint = CompoundConfig[chainId].subgraph
        const client = new GraphQLClient(endpoint)
        this.subgraph = getSdk(client)
    }

    async findAllMarkets() {
        const { markets } = await this.subgraph.AllMarkets()
        return markets.map(m => this.enhanceMarket(m))
    }

    async findAllMarketsWithSupplyPositions(account) {
        const markets = await this.findAllMarkets()
        const { positions } = await this.subgraph.SupplyPositionsByAccount({ address: account})
        return markets.map(m => {
            const decimals = baseTokenDecimals(m)
            const position = positions?.find(p => p.market.id === m.id)
            const userBaseBalance = position?.accounting.baseBalance || 0
            return { 
                ...m,
                userPosition: {
                    balance: tokenScale(userBaseBalance, decimals),
                    balanceUsd: position?.accounting.baseBalanceUsd || 0,
                }
            }
        });
    }

    enhanceMarket(market) {
        const decimals = baseTokenDecimals(market)
        const presentTotalBaseSupply = presentBaseValue(market.accounting.totalBasePrincipalSupply, market.accounting.baseSupplyIndex)
        market.accounting.netSupplyAprScaled = percentScale(market.accounting.netSupplyApr)
        market.accounting.rewardSupplyAprScaled = percentScale(market.accounting.rewardSupplyApr)
        market.accounting.supplyAprScaled = percentScale(market.accounting.supplyApr)
        market.accounting.netBorrowAprScaled = percentScale(market.accounting.netBorrowApr)
        market.accounting.rewardBorrowAprScaled = percentScale(market.accounting.rewardBorrowApr)
        market.accounting.borrowAprScaled = percentScale(market.accounting.borrowApr)
        market.accounting.totalBaseSupplyScaled = tokenScale(market.accounting.totalBaseSupply, decimals)
        market.accounting.totalPresentSupplyScaled = tokenScale(presentTotalBaseSupply, decimals)
        return market
    }
}

