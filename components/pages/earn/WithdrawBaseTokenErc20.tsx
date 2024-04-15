import { useCurrentChain } from '../../../hooks/useCurrentChain'
import * as MarketSelector from '../../../selectors/market-selector'
import { ActionType, PriceFeed, Token } from '../../../types'
import * as MarketUtils from '../../../utils/markets'
import WithdrawErc20Token from '../../withdraw/WithdrawErc20Token'

export default function WithdrawBaseTokenErc20(market) {

    const { currentChainId: chainId } = useCurrentChain()

    const comet = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    const priceFeed : PriceFeed = {
        address: MarketSelector.baseTokePriceFeed(market),
        kind: MarketUtils.getPriceFeedKind(market, chainId)
    }

    const token: Token = {...baseToken, priceFeed }

    return <WithdrawErc20Token comet={comet} token={token} withdrawType={ActionType.WithdrawBaseToken} onWithdraw={market.onAction} />
}