import { useCurrentAccount } from '../hooks/useCurrentAccount';
import css from '../styles/components/UserAccount.module.scss';
import Price from './Price';
import { useCurrentChain } from '../hooks/useCurrentChain';
import { useCollateralPositions } from '../hooks/useCollateralPositions';
import { useBorrowPositions } from '../hooks/useBorrowPositions';
import { useSupplyPositions } from '../hooks/useSupplyPositions';
import NoData from './NoData';
import { useTotalCollateralUsdByChain } from '../hooks/useTotalCollateralUsdByChain';
import { useRewardsOwed } from '../hooks/useRewardsOwed';
import { useTotalRewardsUsdByChain } from '../hooks/useTotalRewardsUsdByChain';
import { chainIcon, chainName } from '../utils/chains';
import { useTotalBorrowingsUsdByChain } from '../hooks/useTotalBorrowingsUsdByChain';
import { useTotalEarningsUsdByChain } from '../hooks/useTotalEarningsUsdByChain';

export default function UserAccount() {
    const { isConnected } = useCurrentAccount()
    const { currentChainId: chainId } = useCurrentChain()

    const asyncBorrowPositions = useBorrowPositions()
    const asyncSupplyPositions = useSupplyPositions()
    const asyncCollateralPositions = useCollateralPositions()
    const asyncRewardsOwed = useRewardsOwed()

    const totalBorrowings = useTotalBorrowingsUsdByChain({ asyncBorrowPositions }) 
    const totalEarnings =useTotalEarningsUsdByChain({ asyncSupplyPositions }) 
    const totalCollateral = useTotalCollateralUsdByChain({ asyncCollateralPositions })
    const totalRewards = useTotalRewardsUsdByChain(asyncRewardsOwed)

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
                    { (totalBorrowings.isPending || totalBorrowings.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : totalBorrowings.isSuccess ? (
                        <div className="text-body-secondary"><Price value={totalBorrowings.data} /></div>
                    ) : (
                        <div className="text-body-secondary"><NoData /></div>
                    )}
                </div>
                <div>
                    <div className="fw-semibold mb-1">Earning</div> 
                    { (totalEarnings.isPending || totalEarnings.isLoading) ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : totalEarnings.isSuccess ? (
                        <div className="text-body-secondary"><Price value={totalEarnings.data} /></div>
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
