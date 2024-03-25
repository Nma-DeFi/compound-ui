import { nf } from "../utils/number"

export default function Apr({ value }) {
    return <>{ nf(value) }<small>%</small></>
}