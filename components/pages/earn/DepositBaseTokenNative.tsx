import { useCurrentChain } from "../../../hooks/useCurrentChain"
import * as MarketSelector from "../../../selectors/market-selector"
import { ActionType, PriceFeed, Token } from "../../../types"
import * as MarketUtils from '../../../utils/markets'
import DepositNativeCurrency from "../../deposit/DepositNativeCurrency"

export default function DepositBaseTokenNative(market) {

    const { currentChainId: chainId } = useCurrentChain()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const priceFeed : PriceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token: Token = {...baseToken, priceFeed }

    return <DepositNativeCurrency comet={comet} token={token} depositType={ActionType.DepositBaseToken} />
}
