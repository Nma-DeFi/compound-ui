import * as MarketSelector from '../../../selectors/market-selector'
import { ActionType, WithdrawType } from '../../../types'
import WithdrawErc20Token from '../../withdraw/WithdrawErc20Token'

export default function WithdrawBaseTokenErc20(market) {

    const baseToken = MarketSelector.baseToken(market)
    const cometProxy = MarketSelector.cometProxy(market)

    return <WithdrawErc20Token comet={cometProxy} token={baseToken} withdrawType={ActionType.WithdrawBaseToken} />
}