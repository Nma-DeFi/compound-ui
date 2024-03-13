import { cometAbi } from "../abi/cometAbi"
import { fromBigInt } from "../utils/bn"

export class PositionsService {

    publicClient
    contract

    constructor({ publicClient, comet }) {
        this.publicClient = publicClient
        this.contract = {
            address: comet,
            abi: cometAbi
        }
    }

    async supplyBalanceOf(account) {
        const [ balance, decimals ] = await this.publicClient.multicall({
            contracts: [
                {
                    ...this.contract,
                    functionName: 'balanceOf',
                    args: [ account ],
                },
                {
                    ...this.contract,
                    functionName: 'decimals',
                }
            ],
            allowFailure: false,
        })
        console.log(
            Date.now(), 
            'PositionsService.supplyBalanceOf',
            'account', account,
            'comet', this.contract.address,
            'balance', balance,
            'decimals', decimals,
        )
        return fromBigInt(balance, decimals)
    }

    async borrowBalanceOf(account) {
        const [ balance, decimals ] = await this.publicClient.multicall({
            contracts: [
                {
                    ...this.contract,
                    functionName: 'borrowBalanceOf',
                    args: [ account ],
                },
                {
                    ...this.contract,
                    functionName: 'decimals',
                }
            ],
            allowFailure: false,
        })
        console.log(
            Date.now(), 
            'PositionsService.borrowBalanceOf',
            'account', account,
            'comet', this.contract.address,
            'balance', balance,
            'decimals', decimals,
        )
        return fromBigInt(balance, decimals)
    }

    async collateralBalanceOf({ account, token }) {
        const { symbol, address, decimals } = token
        const balance = await this.publicClient.readContract({
            ...this.contract,
            functionName: 'collateralBalanceOf',
            args: [ account, address ],
        })
        console.log(
            Date.now(), 
            'PositionsService.collateralBalanceOf',
            'account', account,
            'token', symbol,
            'comet', this.contract.address,
            'balance', balance,
        )
        return fromBigInt(balance, decimals)
    }

    async collateralBalancesOf({ account, tokens }) {
        const contracts = tokens.map(({ token }) => ({
                ...this.contract,
                functionName: 'collateralBalanceOf',
                args: [ account, token.address ], 
            })
        )
        const balances = await this.publicClient.multicall({ contracts, allowFailure: false })
        console.log(
            Date.now(), 
            'PositionsService.collateralBalancesOf',
            'account', account,
            'tokens', tokens,
            'comet', this.contract.address,
            'balances', balances,
        )
        return balances
    }
}