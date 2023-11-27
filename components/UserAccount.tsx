import { useAccount } from 'wagmi';

export default function UserAccount() {

    const { isConnected } = useAccount();

    return isConnected ? (
        <div id="user-account" className="bg-body p-4 border rounded shadow text-center rounded-4">
            <h4 className="mb-4">Your account</h4>
            <div className="d-flex justify-content-between mb-3 small">
                <div className="">
                    <div className="fw-semibold">Collateral</div> 
                    <div className="text-body-secondary">$3.12K</div>
                </div>
                <div className="">
                    <div className="fw-semibold">Borrowing</div> 
                    <div className="text-body-secondary">$1.78K</div>
                </div>
            </div>
            <div className="d-flex justify-content-between mb-2 small">
                <div className="">
                    <div className="fw-semibold">Farming</div> 
                    <div className="text-body-secondary">$2.78K</div>
                </div>
                <div className="">
                    <div className="fw-semibold text-primary">Rewards</div> 
                    <div>12.898 <span style={{fontSize: '75%'}}>COMP</span></div>
                </div>
            </div>
        </div>
    ) : '';
}