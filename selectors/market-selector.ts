export const baseToken = market => market?.configuration?.baseToken.token
export const baseTokenSymbol = market => baseToken(market)?.symbol
export const baseTokenName = market => baseToken(market)?.name
export const baseTokenAddress = market => baseToken(market)?.address
export const baseTokenDecimals = market => baseToken(market)?.decimals
export const cometProxy = market => market?.cometProxy
export const priceFeed = market => market?.configuration?.baseToken.priceFeed
export const collateralTokens = market => market?.configuration?.collateralTokens
export const totalBaseSupplyScaled = market => market?.accounting?.totalBaseSupplyScaled
export const totalBaseSupplyUsd = market => market?.accounting?.totalBaseSupplyUsd
export const netSupplyAprScaled = market => market?.accounting?.netSupplyAprScaled
export const rewardSupplyAprScaled = market => market?.accounting?.rewardSupplyAprScaled 
export const supplyAprScaled = market => market?.accounting?.supplyAprScaled 

