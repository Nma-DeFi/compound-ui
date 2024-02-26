import * as MarketSelector from "../../../selectors/market-selector"
import DepositErc20Token from "../../deposit/DepositErc20Token"

export default function DepositBaseTokenErc20(market) {

    const cometProxy = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    return <DepositErc20Token comet={cometProxy} token={baseToken} />
}
