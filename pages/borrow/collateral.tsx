import { useEffect, useState } from 'react';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import { useMarkets } from '../../hooks/useMarkets';
import { getBaseTokenOrNativeCurrency, getPriceFeedKind } from '../../utils/markets';
import { Path } from '../../components/Layout';
import Link from 'next/link';
import TokenIcon from '../../components/TokenIcon';
import { getTokenOrNativeCurrency, isWrappedNativeToken } from '../../utils/chains';
import DepositCollateralErc20, { DEPOSIT_COLLATERAL_ERC20_MODAL } from '../../components/pages/collaterals/DepositCollateralErc20';
import DepositCollateralNative, { DEPOSIT_COLLATERAL_NATIVE_MODAL } from '../../components/pages/collaterals/DepositCollateralNative';
import { collateralTokens } from '../../selectors/market-selector';
import { useBootstrap } from '../../hooks/useBootstrap';
import { ActionInfo, ActionType, Market, PriceFeed, Token } from '../../types';
import { percent } from '../../utils/number';
import WithdrawCollateralErc20, { WITHDRAW_COLLATERAL_ERC20_MODAL } from '../../components/pages/collaterals/WithdrawCollateralErc20';
import WithdrawCollateralNative, { WITHDRAW_COLLATERAL_NATIVE_MODAL } from '../../components/pages/collaterals/WithdrawCollateralNative';
import { useCollateralPositions } from '../../hooks/useCollateralPositions';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import CollateralBalance from '../../components/CollateralBalance';
import css from '../../styles/components/borrow/Collateral.module.scss';
import PriceAsync from '../../components/PriceAsync';
import { useTotalCollateralUsdByMarket } from '../../hooks/useTotalCollateralUsdByMarket';
import { useCurrentMarket } from '../../hooks/useCurrentMarket';
import { marketChanged } from '../../redux/slices/currentMarket';
import { useAppDispatch } from '../../redux/hooks';
import ActionResult from '../../components/action-result/ActionResult';
import { useLiquidationRisk } from '../../hooks/useLiquidationRisk';
import { usePublicClient } from 'wagmi';
import { LiquidationRiskAsync } from '../../components/LiquidationRisk';
import { isBorrowPosition } from '../../redux/helpers/borrow';
import { useBorrowPositions } from '../../hooks/useBorrowPositions';
import PlaceHolder, { PlaceHolderSize } from '../../components/PlaceHolder';

export default function Collateral() {

    const { DepositCollateral } = ActionType

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const currentMarket = useCurrentMarket()

    const [ _, setToken ] = useState<Token>()

    const [ collatActionInfo, setCollatActionInfo ] = useState(null)
    const [ collatActionResult, setCollatActionResult ] = useState<ActionInfo>()

    const { openModal } = useBootstrap()

    const dispatch = useAppDispatch()

    const asyncCollateralPositions = useCollateralPositions()
    const asyncBorrowPositions = useBorrowPositions()

    const asyncRisk = useLiquidationRisk({ chainId, publicClient, market: currentMarket }) 

    const asyncMarkets = useMarkets({ chainId })

    const { isSuccess: isMarkets, data: markets } = asyncMarkets

    const comet = currentMarket?.cometProxy

    const { 
        isPending: isPendingUsdCollateral, 
        isLoading: isLoadingUsdCollateral, 
        isSuccess: isSuccessUsdCollateral, 
        isError: isErrorUsdCollateral, 
        data: usdCollateral, 
    } = useTotalCollateralUsdByMarket({ asyncCollateralPositions, currentMarket })

    function showModal(action: ActionType, market, collateral) {
        const priceFeed : PriceFeed = {
            address: collateral.priceFeed,
            kind: getPriceFeedKind(market, chainId)
        }
        const token: Token = { 
            ...collateral.token,
            priceFeed,
        } 
        let modal: string
        if (action === DepositCollateral) {
            setCollatActionInfo({ comet, token, onDeposit: setCollatActionResult })
            if (isWrappedNativeToken(chainId, token)) {
                modal = DEPOSIT_COLLATERAL_NATIVE_MODAL
            } else {
                modal = DEPOSIT_COLLATERAL_ERC20_MODAL
            }
        } else  {
            setCollatActionInfo({ comet, token, onWithdraw: setCollatActionResult })
            if (isWrappedNativeToken(chainId, token)) {
                modal = WITHDRAW_COLLATERAL_NATIVE_MODAL
            } else {
                modal = WITHDRAW_COLLATERAL_ERC20_MODAL
            }        
        }
        setToken(token)
        openModal(modal)
    }

    useEffect(() => {
        if (isMarkets && !currentMarket) {
            setCurrentMarket(markets[0])
        }
    }, [chainId, markets])

    useEffect(() => {
        document.getElementById(DEPOSIT_COLLATERAL_ERC20_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(DEPOSIT_COLLATERAL_NATIVE_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(WITHDRAW_COLLATERAL_ERC20_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(WITHDRAW_COLLATERAL_NATIVE_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
    }, [])

    function marketCss(market: Market) {
        const linkCss = 'text-body d-flex align-items-center border-bottom border-3 border-primary py-2'
        return `${linkCss} ${market.id === currentMarket?.id ? css['market-link-active'] : css['market-link']}`
    }

    function setCurrentMarket(market: Market) {
        dispatch(marketChanged(market))
    }

    return (
        <div className="col-12 col-xl-8 col-xxl-7 px-0 px-xl-5">

            <DepositCollateralNative { ...collatActionInfo } />
            <DepositCollateralErc20 { ...collatActionInfo } />
            <WithdrawCollateralNative { ...collatActionInfo } />
            <WithdrawCollateralErc20 { ...collatActionInfo } />
            <ActionResult { ...collatActionResult } />
            
            <div className="row g-0 align-items-center bg-body shadow border rounded-4 p-4 mb-5">
                <div className="col-9 col-sm-4">
                    <h2>Collateral</h2>
                    { isConnected && isMarkets && 
                        <div className="small mt-2">
                            <div>
                                <span className="text-body-secondary">Total deposit :</span>
                                <span className="text-body-tertiary ps-2"><PriceAsync asyncPrice={{ 
                                    isIdle: undefined,
                                    isLoading: isPendingUsdCollateral || isLoadingUsdCollateral, 
                                    isSuccess: isSuccessUsdCollateral, 
                                    isError: isErrorUsdCollateral, 
                                    data: usdCollateral, 
                                }} placeHolderCfg={{ col: 2 }} /></span>
                            </div>
                            { isBorrowPosition(comet, asyncBorrowPositions.data) &&
                            <div>
                                <span className="text-body-secondary">Liquidation risk :</span>
                                <span className="text-body-tertiary ps-2"><LiquidationRiskAsync asyncRisk={asyncRisk} /></span>
                            </div>
                            }
                        </div>
                    }
                </div>
                <div className="col-12 col-sm-7 order-3 order-sm-2">
                { isMarkets && currentMarket &&
                    <>
                        <div className="d-flex d-sm-none justify-content-center pt-5">
                            <SelectMarket {...{ markets, currentMarket, chainId, setCurrentMarket }} />
                        </div>
                        <div className="d-none d-sm-flex justify-content-end pt-0">
                            {(markets.length < 3) ? (
                                <>
                                    {markets.map((market) =>
                                        <div key={market.id} className={marketCss(market)} onClick={() => setCurrentMarket(market)}>
                                            <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId)?.symbol} width={25} css={`me-2 ${css['market-icon']}`} />
                                            { getBaseTokenOrNativeCurrency(market, chainId)?.symbol } <span className="text-body-tertiary ps-1">Market</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <SelectMarket {...{ markets, currentMarket, chainId, setCurrentMarket }} />
                            )}
                        </div>
                    </>
                }
                </div>
                <div className="col-3 col-sm-1 order-2 order-sm-3 text-end">
                    <Link href={Path.Borrow}>
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </Link>
                </div>
            </div>

            { collateralTokens(currentMarket).map(collateral =>
                <div key={collateral.token.address} className="row g-0 bg-body shadow border rounded p-3 mb-4">
                    <div className="col-12 col-sm-5">
                        <div className="d-flex align-items-center justify-content-start mb-5 mb-sm-0">
                            <TokenIcon symbol={ getTokenOrNativeCurrency(chainId, collateral.token)?.symbol } width="48" />
                            <div className={css['collateral-name']}>
                                <div className="fs-5 fw-semibold">{ getTokenOrNativeCurrency(chainId, collateral.token)?.symbol }</div>
                                <div className="text-body-secondary">{ getTokenOrNativeCurrency(chainId, collateral.token)?.name }</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 d-flex justify-content-start justify-content-sm-center">
                        <CollateralBalance market={currentMarket} collateral={collateral} />
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="d-flex flex-column">
                            <button type="button" className="btn btn-primary text-white mb-2" onClick={() => showModal(ActionType.DepositCollateral, currentMarket, collateral)}>Deposit</button>
                            <button type="button" className="btn btn-primary text-white" onClick={() => showModal(ActionType.WithdrawCollateral, currentMarket, collateral)}>Withdraw</button>
                        </div>
                    </div>
                    <div className="w-100 my-4 my-sm-2"></div>
                    <div className="col-12">
                        <div className="d-flex text-body-secondary text-center small">
                            <div className="flex-fill border-end p-2">Loan to value : <span className="opacity-75">{percent(collateral.borrowCollateralFactor)}</span></div>
                            <div className="flex-fill p-2">Liquidation threshold : <span className="opacity-75">{percent(collateral.liquidateCollateralFactor)}</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function SelectMarket({ markets, currentMarket, chainId, setCurrentMarket }) {
    return (
        <div className="btn-group">
            <button id={css['market-combo-button']} type="button" className="btn btn-light border shadow-sm rounded-5 dropdown-toggle px-3" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="d-flex align-items-center">
                    <TokenIcon symbol={getBaseTokenOrNativeCurrency(currentMarket, chainId)?.symbol} css={css['icon']} />
                    <div className={css['market-name']}>
                    { getBaseTokenOrNativeCurrency(currentMarket, chainId)?.symbol } <span className="text-body-secondary">Market</span>
                    </div>
                    <i className="bi bi-chevron-down"></i>
                </div>
            </button>
            <ul id={css['market-combo-dropdown']} className="dropdown-menu">
                {markets.map((market) =>
                    <li key={market.id}>
                        <button className="dropdown-item d-flex align-items-center py-2" type="button" onClick={() => setCurrentMarket(market)}>
                            <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId)?.symbol} css={css['icon']} />
                            <div className="ps-2">
                            { getBaseTokenOrNativeCurrency(market, chainId)?.symbol } <span className="text-body-secondary">Market</span>
                            </div>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )

}
