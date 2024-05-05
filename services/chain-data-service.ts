import { GraphQLClient } from "graphql-request"
import { orderedChainList } from "../utils/chains"
import { CompoundConfig } from "../compound-config"
import { getSdk } from "../graphql/generated/sdk"

export class ChainDataService {

    static findAllChains() {
        const promises = orderedChainList().map(async chain => { 
            const endpoint = CompoundConfig[chain.id].subgraph
            const client = new GraphQLClient(endpoint)
            const { markets } = await getSdk(client).AllMarkets()
            return ({ ...chain, markets })
        })
        return Promise.all(promises)
    }
}