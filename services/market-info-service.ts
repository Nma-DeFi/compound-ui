import { GraphQLClient } from "graphql-request";
import { COMPOUND_CONFIG} from "../compound-config";
import { AllMarketsQuery, Sdk, getSdk } from "../graphql/generated/sdk";
import { presentBaseValue, priceScale, tokenScale } from "../comet"

export class MarketInfoService {

    subgraph: Sdk;

    constructor({ chainId }) {
        const endpoint = COMPOUND_CONFIG[chainId].subgraph;
        const client = new GraphQLClient(endpoint);
        this.subgraph = getSdk(client);
    }

    async findAllMarkets() {
        const data: AllMarketsQuery = await this.subgraph.AllMarkets();
        return data.markets.map(m => this.extendMarket(m));
    }

    extendMarket(market) {
        const baseTokenDecimals =  market.configuration.baseToken.token.decimals;
        const presentTotalBaseSupply = presentBaseValue(market.accounting.totalBasePrincipalSupply, market.accounting.baseSupplyIndex);
        market.accounting.netSupplyAprScaled = Number(market.accounting.netSupplyApr) * 100;
        market.accounting.totalBaseSupplyScaled = tokenScale(market.accounting.totalBaseSupply, baseTokenDecimals);
        market.accounting.totalBaseSupplyScaledStr = market.accounting.totalBaseSupplyScaled.toFixed();
        market.accounting.totalPresentSupplyScaled = tokenScale(presentTotalBaseSupply, baseTokenDecimals);
        market.accounting.totalPresentSupplyScaledStr = market.accounting.totalPresentSupplyScaled.toFixed(); 
        return market;
    }

  }