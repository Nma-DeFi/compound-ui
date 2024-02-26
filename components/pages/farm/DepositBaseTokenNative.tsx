import * as MarketSelector from "../../../selectors/market-selector"
import DepositNativeCurrency from "../../deposit/DepositNativeCurrency"

export default function DepositBaseTokenNative(market) {

    const cometProxy = MarketSelector.cometProxy(market)

    return <DepositNativeCurrency comet={cometProxy} />
}
