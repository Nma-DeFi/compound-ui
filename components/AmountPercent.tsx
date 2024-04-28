import BigNumber from "bignumber.js"
import { Token } from "../types"

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

export function fillInput({ amount, token, id } : { amount: BigNumber, token: Token, id: string}) {
    const newInput = amount ? amount.toFixed(token.decimals) : ''
    const elem = document.getElementById(id) 
    const input = elem as HTMLInputElement
    input.value = newInput
}