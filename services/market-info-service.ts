import { GraphQLClient } from "graphql-request";
import { COMPOUND_CONFIG} from "../compound-config";
import { Sdk, getSdk } from "../graphql/generated/sdk";
import { presentBaseValue, tokenScale } from "../comet"
import { baseTokenDecimals } from "../selectors/market-selector";

export class MarketInfoService {

    subgraph: Sdk;

    constructor({ chainId }) {
        const endpoint = COMPOUND_CONFIG[chainId].subgraph
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
        market.accounting.netSupplyAprScaled = Number(market.accounting.netSupplyApr) * 100
        market.accounting.rewardSupplyAprScaled = Number(market.accounting.rewardSupplyApr) * 100
        market.accounting.supplyAprScaled = Number(market.accounting.supplyApr) * 100 
        market.accounting.totalBaseSupplyScaled = tokenScale(market.accounting.totalBaseSupply, decimals)
        market.accounting.totalPresentSupplyScaled = tokenScale(presentTotalBaseSupply, decimals)
        return market
    }
}

