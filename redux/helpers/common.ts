import { supplyPositionsRefresh, supplyPositionsReset } from '../slices/positions/supplyPositions'
import { borrowPositionsReset, borrowPositionsRefresh } from '../slices/positions/borrowPositions'

export const accruedPositionsReset = () => (dispatch) => {
  dispatch(supplyPositionsReset())
  dispatch(borrowPositionsReset())
}

export const accruedPositionsRefresh = () => (dispatch) => {
  dispatch(supplyPositionsRefresh())
  dispatch(borrowPositionsRefresh())
}
