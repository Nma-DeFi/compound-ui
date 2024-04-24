import { NoData } from "../utils/page"
import { AsyncBigNumber } from "../utils/async"
import PlaceHolder, { PlaceHolderParam } from "./PlaceHolder"
import Price from "./Price"

type PriceAsyncParam = {
    asyncPrice: AsyncBigNumber,
    placeHolderCfg?: PlaceHolderParam,
}

export default function PriceAsync({ asyncPrice, placeHolderCfg } : PriceAsyncParam) {

    const { isLoading, isSuccess, data: price } = asyncPrice
    
    return (
        <>
            { isLoading ? (
              <PlaceHolder {...placeHolderCfg}/>
            ) : isSuccess ? (
              <Price value={price} />
            ) : (
              <>{NoData}</>
            )}
        </>    
    )
}