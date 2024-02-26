import { AsyncBigNumber } from "../utils/async";
import Amount from "./Amount";
import { NoData } from "./Layout";

export default function AsyncAmount({ isLoading, isSuccess, data: balance} : AsyncBigNumber) {
    return (
      <>
          { isLoading ? (
            <span className="placeholder-glow ms-1">
              <span className="placeholder placeholder-sm bg-secondary-subtle col-4"></span>
            </span>
          ) : isSuccess ? (
            <span className="text-body-tertiary"><Amount value={balance} /></span>
          ) : (
            <>{NoData}</>
          )}
      </>    
    )
}