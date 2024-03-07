import { SupplyPositionsData } from '../slices/positions/supplyPositions';
import { bnf } from '../../utils/bn';


export function log(chainId: number, positions: SupplyPositionsData) {
  const formatter = ({ baseToken, supplyBalance }) => `${baseToken.name} : ${bnf(supplyBalance)}`;
  console.log(Date.now(), 'supplyPositions', chainId, Object.values(positions).map(formatter));
}
