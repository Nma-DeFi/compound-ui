import { bnf } from '../../utils/bn';
import { BorrowPositionsData } from '../slices/positions/borrowPositions';


export function log(chainId: number, positions: BorrowPositionsData) {
  const formatter = ({ baseToken, borrowBalance }) => `${baseToken.name} : ${bnf(borrowBalance)}`;
  console.log(Date.now(), 'borrowPositions', chainId, Object.values(positions).map(formatter));
}
