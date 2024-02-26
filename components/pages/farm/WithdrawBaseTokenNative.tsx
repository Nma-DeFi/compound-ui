import * as MarketSelector from '../../../selectors/market-selector'
import { WithdrawType } from '../../../types'
import WithdrawNativeCurrency from '../../withdraw/WithdrawNativeCurrency'

export default function WithdrawBaseTokenNative(market) {

  const baseToken = MarketSelector.baseToken(market)
  const cometProxy = MarketSelector.cometProxy(market)

  return <WithdrawNativeCurrency comet={cometProxy} token={baseToken} withdrawType={WithdrawType.BaseToken} />
}