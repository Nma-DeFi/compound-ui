import * as MarketSelector from "../../../selectors/market-selector"
import { ActionType } from "../../../types"
import DepositErc20Token from "../../deposit/DepositErc20Token"

export default function DepositBaseTokenErc20(market) {

    const cometProxy = MarketSelector.cometProxy(market)
    const baseToken = MarketSelector.baseToken(market)

    return <DepositErc20Token comet={cometProxy} token={baseToken} depositType={ActionType.DepositBaseToken} />
}
