import { useCurrentChain } from "../../../hooks/useCurrentChain"
import * as MarketSelector from "../../../selectors/market-selector"
import { ActionType, PriceFeed, Token } from "../../../types"
import * as MarketUtils from "../../../utils/markets"
import DepositErc20Token from "../../deposit/DepositErc20Token"

export default function DepositBaseTokenErc20(market) {

    const { currentChainId: chainId } = useCurrentChain()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const priceFeed : PriceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token: Token = {...baseToken, priceFeed }

    return <DepositErc20Token comet={comet} token={token} depositType={ActionType.DepositBaseToken} onDeposit={market.onAction} />
}
