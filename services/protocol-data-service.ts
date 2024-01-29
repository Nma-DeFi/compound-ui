import { GraphQLClient } from "graphql-request";
import { COMPOUND_CONFIG} from "../compound-config";
import { Sdk, getSdk } from "../graphql/generated/sdk";

export class ProtocolDataService {

    subgraph: Sdk;

    constructor({ chainId }) {
        const endpoint = COMPOUND_CONFIG[chainId].subgraph
        const client = new GraphQLClient(endpoint)
        this.subgraph = getSdk(client)
    }

    async fetchProtocol() {
        const { protocols } = await this.subgraph.Protocol()
        return protocols[0]
    }

}

