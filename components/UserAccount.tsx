import { useEffect, useState } from 'react';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import css from '../styles/components/UserAccount.module.scss';
import Price from './Price';
import { usePublicClient } from 'wagmi';
import { useCurrentChain } from '../hooks/useCurrentChain';
import { usePriceService } from '../hooks/usePriceService';
import { AsyncBigNumber, IdleData, loadAsyncData } from '../utils/async';
import { useCollateralPositions } from '../hooks/useCollateralPositions';
import { useBorrowPositions } from '../hooks/useBorrowPositions';
import { useSupplyPositions } from '../hooks/useSupplyPositions';
import { getTotalBorrowingsUsdBalance } from '../redux/helpers/borrow';
import { getTotalEarningsUsdBalance } from '../redux/helpers/supply';
import NoData from './NoData';
import { useTotalCollateralUsdByChain } from '../hooks/useTotalCollateralUsdByChain';
import { useRewardsOwed } from '../hooks/useRewardsOwed';
import { useTotalRewardsUsdByChain } from '../hooks/useTotalRewardsUsdByChain';
import { chainIcon, chainName } from '../utils/chains';

export default function UserAccount() {
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const publicClient = usePublicClient({ chainId })
    const priceService = usePriceService({ chainId, publicClient})

    const asyncBorrowPositions = useBorrowPositions()
    const asyncSupplyPositions = useSupplyPositions()
    const asyncCollateralPositions = useCollateralPositions()
    const asyncRewardsOwed = useRewardsOwed()

    const totalCollateral = useTotalCollateralUsdByChain({ asyncCollateralPositions })
    const totalRewards = useTotalRewardsUsdByChain(asyncRewardsOwed)

    const { isSuccess: isSupplyPositions, data: supplyPositions } = asyncSupplyPositions
    const { isSuccess: isBorrowPositions, data: borrowPositions } = asyncBorrowPositions
    
    const [ earning, setEarning ] = useState<AsyncBigNumber>(IdleData)
    const [ borrowing, setBorrowing ] = useState<AsyncBigNumber>(IdleData)


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

    console.log('css', css)


    return isConnected && (
        <div id={css['user-account']} className="bg-body py-4 border rounded shadow text-center rounded-4">
            <h4 className={css['title']}>Your account</h4>
            <div className={`${css['chain']} d-flex  justify-content-center align-items-center`}>
                <div className={`${css['chain-label']} fw-semibold`}>Chain</div>
                <img className={css['network-icon']} src={chainIcon(chainId)} alt={chainName(chainId)} />
                {chainName(chainId)}
            </div>
            <div className={`${css['data-row']} d-flex justify-content-around justify-content-xl-between`}>
                <div>
                    <div className="fw-semibold mb-1">Borrowing</div> 
                    { (borrowing.isIdle || borrowing.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : borrowing.isSuccess ? (
                        <div className="text-body-secondary"><Price value={borrowing.data} /></div>
                    ) : (
                        <div className="text-body-secondary"><NoData /></div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold mb-1">Earning</div> 
                    { (earning.isIdle || earning.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : earning.isSuccess ? (
                        <div className="text-body-secondary"><Price value={earning.data} /></div>
                    ) : (
                        <div className="text-body-secondary"><NoData /></div>
                    )}
                </div>
            </div>
            <div className={`${css['data-row']} d-flex justify-content-around justify-content-xl-between mb-2`}>
                <div>
                    <div className="fw-semibold mb-1">Collateral</div> 
                    { (totalCollateral.isPending || totalCollateral.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : totalCollateral.isSuccess ? (
                        <div className="text-body-secondary"><Price value={totalCollateral.data} /></div>
                    ) : (
                        <div className="text-body-secondary"><NoData /></div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold text-primary mb-1">Rewards</div> 
                    { (totalRewards.isPending || totalRewards.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : totalRewards.isSuccess ? (
                        <div className="text-body-secondary"><Price value={totalRewards.data} /></div>
                    ) : (
                        <div className="text-body-secondary"><NoData /></div>
                    )}
                </div>
            </div>
        </div>
    )
}
