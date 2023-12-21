import { GraphQLClient } from "graphql-request";
import { NETWORKS_CONFIG } from "../networks-config";
import { getSdk } from "../graphql/generated/sdk";

export function useSubgraph(chainId: number) {
    const endpoint = NETWORKS_CONFIG[chainId].subgraph;
    const client = new GraphQLClient(endpoint);
    return getSdk(client);
}