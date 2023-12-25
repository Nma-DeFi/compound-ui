import { mainnet } from 'wagmi/chains';
import { MarketInfoService } from '../services/market-info-service';

const service = new MarketInfoService({ chainId: mainnet.id });

it('findAllMarkets', async () => {
    const data = await service.findAllMarkets()
    console.log('findAllMarkets', data);
})
