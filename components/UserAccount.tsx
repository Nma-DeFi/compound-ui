import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { SupplyPositionsState } from '../redux/slices/positions/supplyPositions';
import { RootState } from '../redux/types';
import css from '../styles/components/UserAccount.module.scss';
import { Zero } from '../utils/bn';
import Price from './Price';
import { usePublicClient } from 'wagmi';
import { useCurrentChain } from '../hooks/useCurrentChain';
import { useComet } from '../hooks/useComet';
import { usePriceService } from '../hooks/usePriceService';
import { AsyncBigNumber, AsyncStatus, IdleData, LoadingData, loadAsyncData } from '../utils/async';
import { NoData } from './Layout';
import { CollateralPositionsState } from '../redux/slices/positions/collateralPositions';
import { getTotalCollateralUsdBalance } from '../redux/slices/helpers/collateral';

type PositionsState = { 
    supplyPositions: SupplyPositionsState, 
    collateralPositions: CollateralPositionsState 
}

export function UserAccount(positionsState : PositionsState) {

    const { isSuccess: isSupplyPositions, data: supplyPositions } = positionsState.supplyPositions
    const { isSuccess: isCollateralPositions, data: collateralPositions } = positionsState.collateralPositions
    
    const [ farming, setFarming ] = useState<AsyncBigNumber>(IdleData)
    const [ collateral, setCollateral ] = useState<AsyncBigNumber>(IdleData)

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })
    const comet = useComet({ chainId })

    const priceService = usePriceService({ comet, publicClient})

    useEffect(() => {
        if (isSupplyPositions && priceService) {
            setFarming(LoadingData)
            const positions = Object.values(supplyPositions)
            const pricesPromise = positions.map(({ priceFeed }) => priceService.getPriceFromFeed(priceFeed))
            Promise.all(pricesPromise).then(prices => {
                let farming: BigNumber = Zero
                for (let index = 0; index < prices.length; index++) {
                    const price = prices[index]
                    const balance = positions[index].supplyBalance
                    farming = farming.plus(balance.times(price))
                }   
                setFarming({...AsyncStatus.Success, data: farming})
            })    
        } else {
            setFarming(IdleData)
        }
    }, [isSupplyPositions, priceService])

    useEffect(() => {
        if (isCollateralPositions && priceService) {
            const promise = getTotalCollateralUsdBalance({ collateralPositions, priceService })
            loadAsyncData(promise, setCollateral)
        } else {
            setCollateral(IdleData)
        }
    }, [isCollateralPositions, priceService])

    return isConnected ? (
        <div id={css['user-account']} className="bg-body p-4 border rounded shadow text-center rounded-4 mt-4 mt-xl-0">
            <h4 className={css['title']}>Your account</h4>
            <div className="d-flex justify-content-around justify-content-xl-between mb-3 small">
                <div>
                    <div className="fw-semibold mb-1">Collateral</div> 
                    { (collateral.isIdle || collateral.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : collateral.isSuccess ? (
                        <div className="text-body-secondary"><Price value={collateral.data} /></div>
                    ) : (
                        <div className="text-body-secondary">{NoData}</div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold mb-1">Borrowing</div> 
                    <div className="text-body-secondary">—</div>
                </div>
            </div>
            <div className="d-flex justify-content-around justify-content-xl-between mb-2 small">
                <div>
                    <div className="fw-semibold mb-1">Farming</div> 
                    { (farming.isIdle || farming.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : farming.isSuccess ? (
                        <div className="text-body-secondary"><Price value={farming.data} /></div>
                    ) : (
                        <div className="text-body-secondary">{NoData}</div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold text-primary  mb-1">Rewards</div> 
                    <div>— <span className={css['comp-label']}>COMP</span></div>
                </div>
            </div>
        </div>
    ) : ''
}

const mapStateToProps = ({ supplyPositions, collateralPositions } : RootState) => { 
    return { supplyPositions, collateralPositions }
}
export default connect(mapStateToProps)(UserAccount)