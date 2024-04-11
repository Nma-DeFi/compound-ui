import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { SupplyPositionsState } from '../redux/slices/positions/supplyPositions';
import { RootState } from '../redux/types';
import css from '../styles/components/UserAccount.module.scss';
import Price from './Price';
import { usePublicClient } from 'wagmi';
import { useCurrentChain } from '../hooks/useCurrentChain';
import { usePriceService } from '../hooks/usePriceService';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../utils/async';
import { NoData } from './Layout';
import { CollateralPositionsState } from '../redux/slices/positions/collateralPositions';
import { getTotalCollateralUsdBalance } from '../redux/helpers/collateral';
import { BorrowPositionsState } from '../redux/slices/positions/borrowPositions';
import { useCollateralPositions } from '../hooks/useCollateralPositions';
import { useBorrowPositions } from '../hooks/useBorrowPositions';
import { useSupplyPositions } from '../hooks/useSupplyPositions';
import { getTotalBorrowingsUsdBalance } from '../redux/helpers/borrow';
import { getTotalEarningsUsdBalance } from '../redux/helpers/supply';

type PositionsState = { 
    supplyPositions: SupplyPositionsState, 
    borrowPositions: BorrowPositionsState, 
    collateralPositions: CollateralPositionsState 
}

export function UserAccount(positionsState : PositionsState) {

    useCollateralPositions()
    useBorrowPositions()
    useSupplyPositions()

    const { isSuccess: isSupplyPositions, data: supplyPositions } = positionsState.supplyPositions
    const { isSuccess: isBorrowPositions, data: borrowPositions } = positionsState.borrowPositions
    const { isSuccess: isCollateralPositions, data: collateralPositions } = positionsState.collateralPositions
    
    const [ earning, setEarning ] = useState<AsyncBigNumber>(IdleData)
    const [ borrowing, setBorrowing ] = useState<AsyncBigNumber>(IdleData)
    const [ collateral, setCollateral ] = useState<AsyncBigNumber>(IdleData)

    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })
    const priceService = usePriceService({ chainId, publicClient})

    useEffect(() => {
        if (isSupplyPositions && priceService) {
            const promise = getTotalEarningsUsdBalance({ supplyPositions, priceService })
            loadAsyncData(promise, setEarning)
        } else {
            setEarning(IdleData)
        }
    }, [supplyPositions, priceService])

    useEffect(() => {
        if (isBorrowPositions && priceService) {
            const promise = getTotalBorrowingsUsdBalance({ borrowPositions, priceService })
            loadAsyncData(promise, setBorrowing)
        } else {
            setBorrowing(IdleData)
        }
    }, [borrowPositions, priceService])

    useEffect(() => {
        if (isCollateralPositions && priceService) {
            const promise = getTotalCollateralUsdBalance({ collateralPositions, priceService })
            loadAsyncData(promise, setCollateral)
        } else {
            setCollateral(IdleData)
        }
    }, [collateralPositions, priceService])


    return isConnected && (
        <div id={css['user-account']} className="bg-body py-4 border rounded shadow text-center rounded-4 mt-4 mt-xl-0">
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
                    { (borrowing.isIdle || borrowing.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : borrowing.isSuccess ? (
                        <div className="text-body-secondary"><Price value={borrowing.data} /></div>
                    ) : (
                        <div className="text-body-secondary">{NoData}</div>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-around justify-content-xl-between mb-2 small">
                <div>
                    <div className="fw-semibold mb-1">Earning</div> 
                    { (earning.isIdle || earning.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : earning.isSuccess ? (
                        <div className="text-body-secondary"><Price value={earning.data} /></div>
                    ) : (
                        <div className="text-body-secondary">{NoData}</div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold text-primary mb-1">Rewards</div> 
                    <div>{NoData}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ supplyPositions, borrowPositions, collateralPositions } : RootState) => { 
    return { supplyPositions, borrowPositions, collateralPositions }
}
export default connect(mapStateToProps)(UserAccount)