import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { SupplyPositionsState } from '../redux/slices/positions/supplyPositions';
import { RootState } from '../redux/types';
import { PriceService } from '../services/price-service';
import css from '../styles/components/UserAccount.module.scss';
import { Zero, bnf } from '../utils/bn';
import { PRICE_DP } from './Price';

export function UserAccount({ isLoading, isSuccess, data } : SupplyPositionsState) {

    const { isConnected } = useCurrentAccount()

    const [ farming, setFarming ] = useState<string>()

    useEffect(() => {
        if (isSuccess) {
            const priceService = new PriceService()
            const positions = Object.values(data)
            const pricesPromise = positions
                .map(({ baseToken }) => baseToken.symbol)
                .map(symbol => priceService.getPrice(symbol))
            Promise.all(pricesPromise).then(prices => {
                let totalFarming: BigNumber = Zero
                for (let index = 0; index < prices.length; index++) {
                    const price = prices[index]
                    const balance = positions[index].supplyBalance
                    totalFarming = totalFarming.plus(balance.times(price))
                }
                const totalFarmingUsd = bnf(totalFarming, PRICE_DP, false)
                setFarming(`$${totalFarmingUsd}`)
            })    
        }
    }, [isSuccess])

    return isConnected ? (
        <div id={css['user-account']} className="bg-body p-4 border rounded shadow text-center rounded-4 mt-4 mt-xl-0">
            <h4 className={css['title']}>Your account</h4>
            <div className="d-flex justify-content-around justify-content-xl-between mb-3 small">
                <div>
                    <div className="fw-semibold mb-1">Collateral</div> 
                    <div className="text-body-secondary">—</div>
                </div>
                <div>
                    <div className="fw-semibold mb-1">Borrowing</div> 
                    <div className="text-body-secondary">—</div>
                </div>
            </div>
            <div className="d-flex justify-content-around justify-content-xl-between mb-2 small">
                <div className="">
                    <div className="fw-semibold mb-1">Farming</div> 
                    { isLoading ? (
                        <div className="placeholder bg-secondary-subtle col-10"></div>
                    ) : isSuccess ? (
                        <div className="text-body-secondary">{ farming }</div>
                    ) : (
                        <div className="text-body-secondary">—</div>
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

const mapStateToProps = (state: RootState) => state.supplyPositions
export default connect(mapStateToProps)(UserAccount)