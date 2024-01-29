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

it('PositionsByAccount', async () => {
    const data = await sdk.PositionsBy({where: {account_: {address: "0x00ba3ca0b6df1486c912893d9f288311a60ed753"}}});
    console.log("PositionsByAccount", data);
    expect(data.positions?.length > 0).toBeTruthy();
})

it('SupplyPositionsByAccount', async () => {
    const data = await sdk.PositionsBy({where: {account_: {address: "0x001bcbba74d76875c3a34d6f7d9772bca38b7f8e"}, accounting_: {baseBalance_gt: "0"}}});
    console.log("SupplyPositionsByAccount", data);
    expect(data.positions?.length > 0).toBeTruthy();
})

it('SupplyPositionsByAccount2', async () => {
    const data = await sdk.SupplyPositionsByAccount({ address: "0x001bcbba74d76875c3a34d6f7d9772bca38b7f8e" });
    expect(data.positions?.length).toBe(1);
    console.log("SupplyPositionsByAccount2", data, 
        data.positions[0].account, 
        data.positions[0].accounting, 
        data.positions[0].market);
})

it('Protocol', async () => {
    const data = await sdk.Protocol()
    console.log("Protocol", data)
    expect(data.protocols).toBeDefined()
})


