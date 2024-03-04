import { AsyncBigNumber } from "../utils/async";
import Amount from "./Amount";
import { NoData } from "./Layout";
import PlaceHolder from "./PlaceHolder";

export default function AsyncAmount({ isLoading, isSuccess, data: balance} : AsyncBigNumber) {
    return (
      <>
          { isLoading ? (
            <PlaceHolder col={4} />
          ) : isSuccess ? (
            <Amount value={balance} />
          ) : (
            <>{NoData}</>
          )}
      </>    
    )
}