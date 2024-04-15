import { useCurrentChain } from '../../../hooks/useCurrentChain'
import * as MarketSelector from '../../../selectors/market-selector'
import { ActionType, PriceFeed, Token } from '../../../types'
import * as MarketUtils from '../../../utils/markets'
import WithdrawNativeCurrency from '../../withdraw/WithdrawNativeCurrency'

export default function WithdrawBaseTokenNative(market) {

  const { currentChainId: chainId } = useCurrentChain()

  const comet = MarketSelector.cometProxy(market)
  const baseToken = MarketSelector.baseToken(market)

  const priceFeed : PriceFeed = {
    address: MarketSelector.baseTokePriceFeed(market),
    kind: MarketUtils.getPriceFeedKind(market, chainId)
  }

  const token: Token = {...baseToken, priceFeed }

  return <WithdrawNativeCurrency comet={comet} token={token} withdrawType={ActionType.WithdrawBaseToken}  onWithdraw={market.onAction} />
}