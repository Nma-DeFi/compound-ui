import { AsyncBigNumber } from "../utils/async";
import Amount from "./Amount";
import { NoData } from "./Layout";
import PlaceHolder from "./PlaceHolder";

export default function AsyncAmount({ isIdle, isLoading, isSuccess, data: balance, 
  idleData = NoData, errorData = NoData
  } : AsyncBigNumber & { idleData?: string, errorData?: string }) {
    return (
      <>
          { isLoading ? (
            <PlaceHolder col={4} />
          ) : isSuccess ? (
            <Amount value={balance} />
          ) : isIdle ? (
            <>{idleData}</>
          ): (
            <>{errorData}</>
          )}
      </>    
    )
}