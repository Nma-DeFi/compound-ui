import { GraphQLClient } from "graphql-request";
import { COMPOUND_CONFIG } from "../compound-config";
import { getSdk } from "../graphql/generated/sdk";

export function useSubgraph(chainId: number) {
    const endpoint = COMPOUND_CONFIG[chainId].subgraph;
    const client = new GraphQLClient(endpoint);
    return getSdk(client);
}