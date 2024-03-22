import { GraphQLClient } from "graphql-request";
import { CompoundConfig } from "../compound-config";
import { Sdk, getSdk } from "../graphql/generated/sdk";
import { percentScale, presentBaseValue, amountScale } from "../comet";
import { baseTokenDecimals } from "../selectors/market-selector";

export class MarketDataService {

    subgraph: Sdk

    constructor({ chainId }) {
        const endpoint = CompoundConfig[chainId].subgraph
        const client = new GraphQLClient(endpoint)
        this.subgraph = getSdk(client)
    }

    async findAllMarkets() {
        const { markets } = await this.subgraph.AllMarkets()
        return markets.map(m => this.enhanceMarket(m))
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
        market.accounting.totalBaseSupplyScaled = amountScale(market.accounting.totalBaseSupply, decimals)
        market.accounting.totalPresentSupplyScaled = amountScale(presentTotalBaseSupply, decimals)
        market.configuration.baseBorrowMinScaled = amountScale(market.configuration.baseBorrowMin, decimals)
        return market
    }
}

