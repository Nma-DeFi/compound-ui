import { cometAbi } from "../abi/cometAbi"
import { collateralTokens } from "../selectors/market-selector"
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

    static async supplyBalancesOf({ publicClient, account, markets }) {
        const contracts = markets.map(market => ({
                address: market,
                abi: cometAbi,
                functionName: 'balanceOf',
                args: [ account ], 
            })
        )
        const balances = await publicClient.multicall({ contracts, allowFailure: false })
        console.log(
            Date.now(), 
            'PositionsService.supplyBalancesOf',
            'account', account,
            'markets', markets,
            'balances', balances,
        )
        return balances
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

    static async borrowBalancesOf({ publicClient, account, markets }) {
        const contracts = markets.map(market => ({
                address: market,
                abi: cometAbi,
                functionName: 'borrowBalanceOf',
                args: [ account ], 
            })
        )
        const balances = await publicClient.multicall({ contracts, allowFailure: false })
        console.log(
            Date.now(), 
            'PositionsService.borrowBalancesOf',
            'account', account,
            'markets', markets,
            'balances', balances,
        )
        return balances
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

    static async collateralBalancesOf({ publicClient, account, markets }) {
        let collateralBalances = {}
        const contracts = []
        
        markets.forEach(market => {
            let positionsByCollateralTokens = {}
            collateralTokens(market).forEach(({ token }) => {
                contracts.push({
                    address: market.id,
                    abi: cometAbi,
                    functionName: 'collateralBalanceOf',
                    args: [ account, token.address ], 
                })
                positionsByCollateralTokens = { ...positionsByCollateralTokens, [token.address]: null }
            })
            collateralBalances = { ...collateralBalances, [market.id]: positionsByCollateralTokens }
        })

        const multicallData = await publicClient.multicall({ contracts, allowFailure: false })

        contracts.forEach((contract, index) => {
            const comet = contract.address
            const token = contract.args[1]
            collateralBalances[comet][token] = multicallData[index]
        })

        console.log(
            Date.now(), 
            'PositionsService.collateralBalancesOf',
            'account', account,
            'markets', markets,
            'balances', collateralBalances,
        )

        return collateralBalances
    }
}