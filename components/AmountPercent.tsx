import BigNumber from "bignumber.js"
import { bna } from "./Amount"

export default function AmountPercent({ handler }) {

    return (
        <> 
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.25)}>25%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.5)}>50%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(0.75)}>75%</button></div>
            <div className="col"><button type="button" className="btn btn-light btn-sm text-secondary w-100" onClick={() => handler(1)}>Max</button></div>
        </>
    )
}

export function fillInput({ amount, id } : { amount: BigNumber, id: string}) {
    const newInput = amount ? bna(amount) : ''
    const elem = document.getElementById(id) 
    if (elem) {
        const input = elem as HTMLInputElement
        input.value = newInput
    }
}