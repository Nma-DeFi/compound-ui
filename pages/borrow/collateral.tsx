import { useEffect, useState } from 'react';
import { useCurrentChain } from '../../hooks/useCurrentChain';
import { useMarkets } from '../../hooks/useMarkets';
import { getBaseTokenOrNativeCurrency, getPriceFeedKind } from '../../utils/markets';
import { Path } from '../../components/Layout';
import Link from 'next/link';
import TokenIcon from '../../components/TokenIcon';
import { Address } from 'viem';
import { getTokenOrNativeCurrency, isWrappedNativeToken } from '../../utils/chains';
import DepositErc20Token, { DEPOSIT_ERC20_TOKEN_MODAL } from '../../components/deposit/DepositErc20Token';
import DepositNativeCurrency, { DEPOSIT_NATIVE_CURRENCY_MODAL } from '../../components/deposit/DepositNativeCurrency';
import { collateralTokens, cometProxy } from '../../selectors/market-selector';
import { useBootstrap } from '../../hooks/useBootstrap';
import { ActionType, PriceFeed, Token } from '../../types';
import { percent } from '../../utils/number';
import WithdrawErc20Token, { WITHDRAW_ERC20_TOKEN_MODAL } from '../../components/withdraw/WithdrawErc20Token';
import WithdrawNativeCurrency, { WITHDRAW_NATIVE_CURRENCY_MODAL } from '../../components/withdraw/WithdrawNativeCurrency';
import { useCollateralPositions } from '../../hooks/useCollateralPositions';
import { useAppDispatch } from '../../redux/hooks';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';
import { collateralPositionsInit, getCollateralUsdBalanceByMarket } from '../../redux/slices/positions/collateralPositions';
import CollateralBalance from '../../components/CollateralBalance';
import css from '../../styles/components/borrow/Collateral.module.scss';
import { usePriceService } from '../../hooks/usePriceService';
import { usePublicClient } from 'wagmi';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../../utils/async';
import PriceAsync from '../../components/PriceAsync';


export default function Collateral() {

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })

    const { isSuccess: isMarkets, data: markets } = useMarkets({ chainId })
    const [ marketIndex, setMarketIndex ] = useState<number>(0)
    const [ comet, setComet ] = useState<Address>()
    const [ token, setToken ] = useState<Token>()
    const [ totalUsdBalance, setTotalUsdBalance ] = useState<AsyncBigNumber>(IdleData)

    const { 
        isIdle: isNoCollateralPositions, 
        isSuccess: isCollateralPositions, 
        data: collateralPositions 
    } = useCollateralPositions()
    
    const priceService = usePriceService({ comet, publicClient})

    const { DepositCollateral, WithdrawCollateral } = ActionType

    const dispatch = useAppDispatch()

    const { openModal } = useBootstrap()

    useEffect(() => { 
        if (isConnected && isNoCollateralPositions) {
          dispatch(collateralPositionsInit())
        } 
      }, [isConnected, isNoCollateralPositions])

    useEffect(() => setMarketIndex(0), [chainId])

    useEffect(() => {
        if (isMarkets) {
            const market = markets[marketIndex]
            const comet = cometProxy(market)
            setComet(comet)
        }
    }, [chainId, markets, marketIndex])

    useEffect(() => {
        if (isConnected && isMarkets && isCollateralPositions && priceService) {
            const marketId = cometProxy(markets[marketIndex])
            const promise = getCollateralUsdBalanceByMarket({ 
                collateralPositions, 
                marketId, 
                priceService 
            })
            loadAsyncData(promise, setTotalUsdBalance)
        }
    }, [chainId, markets, marketIndex, collateralPositions, priceService])

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
            if (isWrappedNativeToken(chainId, token)) {
                modal = DEPOSIT_NATIVE_CURRENCY_MODAL
            } else {
                modal = DEPOSIT_ERC20_TOKEN_MODAL
            }
        } else  {
            if (isWrappedNativeToken(chainId, token)) {
                modal = WITHDRAW_NATIVE_CURRENCY_MODAL
            } else {
                modal = WITHDRAW_ERC20_TOKEN_MODAL
            }        
        }
        setToken(token)
        openModal(modal)
    }

    useEffect(() => {
        document.getElementById(DEPOSIT_ERC20_TOKEN_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(DEPOSIT_NATIVE_CURRENCY_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(WITHDRAW_ERC20_TOKEN_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
        document.getElementById(WITHDRAW_NATIVE_CURRENCY_MODAL).addEventListener('hide.bs.modal', () => setToken(null))
    }, [])

    function marketlinkCss(index: number) {
        const linkCss = 'text-body d-flex align-items-center py-2 border-bottom border-5 border-primary'
        return `${linkCss} ${index === marketIndex ? css['market-link-active'] : css['market-link']}`
    }

    return (
        <div className="col-12 col-xl-8 col-xxl-7 px-xl-5">
            <DepositNativeCurrency {...{ comet, token, depositType: DepositCollateral }} />
            <DepositErc20Token {...{ comet, token, depositType: DepositCollateral }} />
            <WithdrawNativeCurrency {...{ comet, token, withdrawType: WithdrawCollateral }} />
            <WithdrawErc20Token {...{ comet, token, withdrawType: WithdrawCollateral }} />
            <div className="row g-0 align-items-center bg-body shadow border rounded-4 p-4 mb-5">
                <div className="col-9 col-sm-4">
                    <h2 className="mb-2">Collateral</h2>
                    { isMarkets && 
                        <>
                            <span className="fs-5 text-body-secondary">{getBaseTokenOrNativeCurrency(markets[marketIndex], chainId).symbol}</span>
                            <span className="text-body-secondary ps-2">Market</span> 
                            {isConnected && 
                                <span className="text-body-tertiary ps-2">: <PriceAsync asyncPrice={totalUsdBalance} placeHolderCfg={{ col: 2 }} /></span>
                            }
                        </>
                    }
                </div>
                <div className="col-12 col-sm-7 order-3 order-sm-2">
                    <div className="d-flex justify-content-around justify-content-sm-end pt-5 pt-sm-0">
                        { isMarkets && markets.map((market, index) =>
                            <div key={market.id} className={marketlinkCss(index)} onClick={() => setMarketIndex(index)}>
                                <TokenIcon symbol={getBaseTokenOrNativeCurrency(market, chainId).symbol} css={`me-2 ${css['market-icon']}`} />
                                {getBaseTokenOrNativeCurrency(market, chainId).symbol} <span className="text-body-tertiary ps-1">Market</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-3 col-sm-1 order-2 order-sm-3 text-end">
                    <Link href={Path.Borrow}>
                        <button type="button" className="btn-close" aria-label="Close"></button>
                    </Link>
                </div>
            </div>

            { isMarkets && collateralTokens(markets[marketIndex]).map(collateral =>
                <div key={collateral.token.address} className="row g-0 bg-body shadow border rounded p-3 mb-4">
                    <div className="col-12 col-sm-5">
                        <div className="d-flex align-items-center justify-content-start mb-5 mb-sm-0">
                            <TokenIcon symbol={getTokenOrNativeCurrency(chainId, collateral.token).symbol} width="48" />
                            <div className={css['collateral-name']}>
                                <div className="fs-5 fw-semibold">{getTokenOrNativeCurrency(chainId, collateral.token).symbol}</div>
                                <div className="text-body-secondary">{getTokenOrNativeCurrency(chainId, collateral.token).name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 d-flex justify-content-start justify-content-sm-center">
                        <CollateralBalance market={markets[marketIndex]} collateral={collateral} />
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="d-flex flex-column">
                            <button type="button" className="btn btn-primary text-white mb-2" onClick={() => showModal(ActionType.DepositCollateral, markets[marketIndex], collateral)}>Deposit</button>
                            <button type="button" className="btn btn-primary text-white" onClick={() => showModal(ActionType.WithdrawCollateral, markets[marketIndex], collateral)}>Withdraw</button>
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
