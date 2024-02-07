
export default function AmountPercent({ handler }) {

    return (
        <> 
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.25)}>25%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.5)}>50%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.75)}>75%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(1)}>Max</button></div>
        </>
    );
}