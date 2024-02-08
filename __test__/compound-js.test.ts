// npm run test

import Compound from "@compound-finance/compound-js";

it('Compound JS SDK', () => {
    expect(Compound).toBeDefined();
    console.log(Compound.comet.getBaseAssetName())
    console.log(Compound.comet.getSupportedDeployments())
})

it('Compound JS Abi', () => {
    console.log(Compound.util.getAbi('Comet'))
})

it('Compound JS Price', async () => {
    const compound = new (Compound as any)()
    console.log('Compound JS Price', 'COMP', await compound.getPrice('COMP'))   
})