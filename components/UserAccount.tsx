import css from '../styles/components/UserAccount.module.scss';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { RootState } from '../redux/types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Zero, bnf } from '../utils/bn';
import BigNumber from 'bignumber.js';

export function UserAccount({ status, positions }) {

    const { isConnected } = useCurrentAccount()
    const [ farming, setFarming ] = useState<string>()

    useEffect(() => {
        if (status === 'success') {
            const reducer = (previous: BigNumber, current: BigNumber) => previous.plus(current)
            const farming = Object.values(positions || []).reduce(reducer, Zero)
            setFarming(bnf(farming))
        }
    }, [status])

    return isConnected ? (
        <div id={css['user-account']} className="bg-body p-4 border rounded shadow text-center rounded-4">
            <h4 className="mb-4">Your account</h4>
            <div className="d-flex justify-content-between mb-3 small">
                <div className="">
                    <div className="fw-semibold">Collateral</div> 
                    <div className="text-body-secondary">—</div>
                </div>
                <div className="">
                    <div className="fw-semibold">Borrowing</div> 
                    <div className="text-body-secondary">—</div>
                </div>
            </div>
            <div className="d-flex justify-content-between mb-2 small">
                <div className="">
                    <div className="fw-semibold">Farming</div> 
                    { status === 'success' ? (
                        <div className="text-body-secondary">${ farming }</div>
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