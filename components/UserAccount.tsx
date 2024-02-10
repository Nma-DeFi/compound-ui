import css from '../styles/components/UserAccount.module.scss';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { RootState } from '../redux/types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Zero, bnf } from '../utils/bn';
import BigNumber from 'bignumber.js';
import { PriceService } from '../services/price-service';
import { SupplyPositionsState } from '../redux/slices/supplyPositions';
import { PriceDecimalPrecision } from './Price';

export function UserAccount({ isSuccess, data } : SupplyPositionsState) {

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
                const totalFarmingUsd = bnf(totalFarming, PriceDecimalPrecision, false)
                setFarming(`$${totalFarmingUsd}`)
            })    
        }
    }, [isSuccess])

    return isConnected ? (
        <div id={css['user-account']} className="bg-body p-4 border rounded shadow text-center rounded-4">
            <h4 className="mb-4">Your account</h4>
            <div className="d-flex justify-content-around justify-content-xl-between mb-3 small">
                <div className="">
                    <div className="fw-semibold">Collateral</div> 
                    <div className="text-body-secondary">—</div>
                </div>
                <div className="">
                    <div className="fw-semibold">Borrowing</div> 
                    <div className="text-body-secondary">—</div>
                </div>
            </div>
            <div className="d-flex justify-content-around justify-content-xl-between mb-2 small">
                <div className="">
                    <div className="fw-semibold">Farming</div> 
                    { isSuccess ? (
                        <div className="text-body-secondary">{ farming }</div>
                    ) : (
                        <div className="text-body-secondary">—</div>
                    )}
                </div>
                <div className="">
                    <div className="fw-semibold text-primary">Rewards</div> 
                    <div>— <span className={css['comp-label']}>COMP</span></div>
                </div>
            </div>
        </div>
    ) : ''
}

const mapStateToProps = (state: RootState) => state.supplyPositions
export default connect(mapStateToProps)(UserAccount)