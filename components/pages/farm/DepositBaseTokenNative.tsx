import * as MarketSelector from "../../../selectors/market-selector"
import { ActionType } from "../../../types"
import DepositNativeCurrency from "../../deposit/DepositNativeCurrency"

export default function DepositBaseTokenNative(market) {

    const comet = MarketSelector.cometProxy(market)

    return <DepositNativeCurrency comet={comet} depositType={ActionType.DepositBaseToken} />
}
