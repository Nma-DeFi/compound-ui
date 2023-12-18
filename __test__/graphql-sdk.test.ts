import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql/generated/sdk";

const ENDPOINT = 'https://api.thegraph.com/subgraphs/name/papercliplabs/compound-v3-mainnet';
const client = new GraphQLClient(ENDPOINT);
const sdk = getSdk(client);

it('AllMarkets', async () => {
    const data = await sdk.AllMarkets();
    console.log("AllMarkets", data.markets?.map(m => m.configuration.baseToken));
    expect(data.markets?.length > 0).toBeTruthy();
})

it('MarketByID', async () => {
    const data = await sdk.MarketByID({ id: "0xa17581a9e3356d9a858b789d68b4d866e593ae94" })
    console.log("MarketByID", data.market);
    expect(data.market).toBeDefined();
})

it('MarketByID2', async () => {
    const data = await sdk.MarketsBy({ where: { id: "0xa17581a9e3356d9a858b789d68b4d866e593ae94"} });
    console.log("MarketByID2", data, data.markets?.map(m => m.configuration.baseToken));
    expect(data.markets?.length).toBe(1);
})