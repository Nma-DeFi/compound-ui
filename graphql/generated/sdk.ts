import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
};

export type AbsorbCollateralInteraction = {
  __typename?: 'AbsorbCollateralInteraction';
  /** Address that triggered the collateral absorb */
  absorber: Scalars['Bytes']['output'];
  /** Amount of collateral absorbed */
  amount: Scalars['BigInt']['output'];
  /** Amount of collateral absorbed in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Collateral asset being absorbed */
  asset: CollateralToken;
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the interaction is with */
  position: Position;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type AbsorbCollateralInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  absorber?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_contains?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_gt?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_gte?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  absorber_lt?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_lte?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AbsorbCollateralInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<CollateralToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<AbsorbCollateralInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum AbsorbCollateralInteraction_OrderBy {
  Absorber = 'absorber',
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetBorrowCollateralFactor = 'asset__borrowCollateralFactor',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetLiquidateCollateralFactor = 'asset__liquidateCollateralFactor',
  AssetLiquidationFactor = 'asset__liquidationFactor',
  AssetPriceFeed = 'asset__priceFeed',
  AssetSupplyCap = 'asset__supplyCap',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type AbsorbDebtInteraction = {
  __typename?: 'AbsorbDebtInteraction';
  /** Address that triggered the absorb */
  absorber: Scalars['Bytes']['output'];
  /** Amount of debt being absorbed */
  amount: Scalars['BigInt']['output'];
  /** Amount of debt being absorbed in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being absorbed by the market */
  asset: BaseToken;
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the interaction is with */
  position: Position;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type AbsorbDebtInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  absorber?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_contains?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_gt?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_gte?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  absorber_lt?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_lte?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  absorber_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AbsorbDebtInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<BaseToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<AbsorbDebtInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum AbsorbDebtInteraction_OrderBy {
  Absorber = 'absorber',
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetPriceFeed = 'asset__priceFeed',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type Account = {
  __typename?: 'Account';
  /** Address of the account */
  address: Scalars['Bytes']['output'];
  /** Block number this account was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Address */
  id: Scalars['Bytes']['output'];
  /** All positions of the account */
  positions: Array<Position>;
  /** All reward claim interactions of the account */
  rewardsClaimed: Array<ClaimRewardsInteraction>;
};


export type AccountPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Position_Filter>;
};


export type AccountRewardsClaimedArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClaimRewardsInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ClaimRewardsInteraction_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
  rewardsClaimed_?: InputMaybe<ClaimRewardsInteraction_Filter>;
};

export enum Account_OrderBy {
  Address = 'address',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  Positions = 'positions',
  RewardsClaimed = 'rewardsClaimed'
}

export type BaseToken = {
  __typename?: 'BaseToken';
  /** Block the base token was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** market ID + token ID */
  id: Scalars['Bytes']['output'];
  /** Last block that the base token config was updated */
  lastConfigUpdateBlockNumber: Scalars['BigInt']['output'];
  /** Block of the last token price update */
  lastPriceBlockNumber: Scalars['BigInt']['output'];
  /** Last token price in USD from the priceFeed */
  lastPriceUsd: Scalars['BigDecimal']['output'];
  /** Market the base token belongs to */
  market: Market;
  /** Price feed for the base token */
  priceFeed: Scalars['Bytes']['output'];
  /** Actual token */
  token: Token;
};

export type BaseToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseToken_Filter>>>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastConfigUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastConfigUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  lastPriceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<BaseToken_Filter>>>;
  priceFeed?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_gt?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_gte?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  priceFeed_lt?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_lte?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum BaseToken_OrderBy {
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  LastConfigUpdateBlockNumber = 'lastConfigUpdateBlockNumber',
  LastPriceBlockNumber = 'lastPriceBlockNumber',
  LastPriceUsd = 'lastPriceUsd',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  PriceFeed = 'priceFeed',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLastPriceBlockNumber = 'token__lastPriceBlockNumber',
  TokenLastPriceUsd = 'token__lastPriceUsd',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type BuyCollateralInteraction = {
  __typename?: 'BuyCollateralInteraction';
  /** Asset being bought */
  asset: CollateralToken;
  /** Base asset amount being given in exchange */
  baseAmount: Scalars['BigInt']['output'];
  /** Base asset amount being given in exchange in USD */
  baseAmountUsd: Scalars['BigDecimal']['output'];
  /** Buyer of the collateral */
  buyer: Scalars['Bytes']['output'];
  /** Collateral amount bought */
  collateralAmount: Scalars['BigInt']['output'];
  /** Collateral amount bought in USD */
  collateralAmountUsd: Scalars['BigDecimal']['output'];
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type BuyCollateralInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BuyCollateralInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<CollateralToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAmount?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseAmountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseAmountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyer?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  buyer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collateralAmount?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralAmountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralAmountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<BuyCollateralInteraction_Filter>>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum BuyCollateralInteraction_OrderBy {
  Asset = 'asset',
  AssetBorrowCollateralFactor = 'asset__borrowCollateralFactor',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetLiquidateCollateralFactor = 'asset__liquidateCollateralFactor',
  AssetLiquidationFactor = 'asset__liquidationFactor',
  AssetPriceFeed = 'asset__priceFeed',
  AssetSupplyCap = 'asset__supplyCap',
  BaseAmount = 'baseAmount',
  BaseAmountUsd = 'baseAmountUsd',
  Buyer = 'buyer',
  CollateralAmount = 'collateralAmount',
  CollateralAmountUsd = 'collateralAmountUsd',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type ClaimRewardsInteraction = {
  __typename?: 'ClaimRewardsInteraction';
  /** Account claiming the reward */
  account: Account;
  /** Amount of reward token */
  amount: Scalars['BigInt']['output'];
  /** Amount of reward token in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Destination of the reward */
  destination: Scalars['Bytes']['output'];
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Reward token */
  token: Token;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type ClaimRewardsInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<ClaimRewardsInteraction_Filter>>>;
  destination?: InputMaybe<Scalars['Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ClaimRewardsInteraction_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ClaimRewardsInteraction_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountCreationBlockNumber = 'account__creationBlockNumber',
  AccountId = 'account__id',
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Destination = 'destination',
  Id = 'id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLastPriceBlockNumber = 'token__lastPriceBlockNumber',
  TokenLastPriceUsd = 'token__lastPriceUsd',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type CollateralBalance = {
  balance: Scalars['BigInt']['output'];
  collateralToken: CollateralToken;
  creationBlockNumber: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  lastUpdateBlockNumber: Scalars['BigInt']['output'];
};

export type CollateralBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollateralBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralToken?: InputMaybe<Scalars['String']['input']>;
  collateralToken_?: InputMaybe<CollateralToken_Filter>;
  collateralToken_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_lt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_lte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CollateralBalance_Filter>>>;
};

export enum CollateralBalance_OrderBy {
  Balance = 'balance',
  CollateralToken = 'collateralToken',
  CollateralTokenBorrowCollateralFactor = 'collateralToken__borrowCollateralFactor',
  CollateralTokenCreationBlockNumber = 'collateralToken__creationBlockNumber',
  CollateralTokenId = 'collateralToken__id',
  CollateralTokenLastConfigUpdateBlockNumber = 'collateralToken__lastConfigUpdateBlockNumber',
  CollateralTokenLastPriceBlockNumber = 'collateralToken__lastPriceBlockNumber',
  CollateralTokenLastPriceUsd = 'collateralToken__lastPriceUsd',
  CollateralTokenLiquidateCollateralFactor = 'collateralToken__liquidateCollateralFactor',
  CollateralTokenLiquidationFactor = 'collateralToken__liquidationFactor',
  CollateralTokenPriceFeed = 'collateralToken__priceFeed',
  CollateralTokenSupplyCap = 'collateralToken__supplyCap',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  LastUpdateBlockNumber = 'lastUpdateBlockNumber'
}

export type CollateralToken = {
  __typename?: 'CollateralToken';
  /** Percent of collateral that can be borrowed against */
  borrowCollateralFactor: Scalars['BigDecimal']['output'];
  /** Block the collateral token was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Market ID + token ID + 'Col' */
  id: Scalars['Bytes']['output'];
  /** Last block the collateral token config was updated */
  lastConfigUpdateBlockNumber: Scalars['BigInt']['output'];
  /** Block of the last token price */
  lastPriceBlockNumber: Scalars['BigInt']['output'];
  /** Last token price in USD from the priceFeed */
  lastPriceUsd: Scalars['BigDecimal']['output'];
  /** Percent of collateral that can be borrowed before the account becomes liquidate-able */
  liquidateCollateralFactor: Scalars['BigDecimal']['output'];
  /** Percent penalty incurred by the account upon liquidation, 0.93 => 7% penalty */
  liquidationFactor: Scalars['BigDecimal']['output'];
  /** Market the collateral token belongs to */
  market: Market;
  /** Price feed for the collateral token */
  priceFeed: Scalars['Bytes']['output'];
  /** Max amount that can be supplied to protect the protocol against over exposure */
  supplyCap: Scalars['BigInt']['output'];
  /** Actual token */
  token: Token;
};

export type CollateralToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollateralToken_Filter>>>;
  borrowCollateralFactor?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowCollateralFactor_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowCollateralFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastConfigUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastConfigUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  lastPriceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidateCollateralFactor?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidateCollateralFactor_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidateCollateralFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidationFactor?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidationFactor_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidationFactor_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<CollateralToken_Filter>>>;
  priceFeed?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_gt?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_gte?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  priceFeed_lt?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_lte?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  priceFeed_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  supplyCap?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyCap_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCap_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum CollateralToken_OrderBy {
  BorrowCollateralFactor = 'borrowCollateralFactor',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  LastConfigUpdateBlockNumber = 'lastConfigUpdateBlockNumber',
  LastPriceBlockNumber = 'lastPriceBlockNumber',
  LastPriceUsd = 'lastPriceUsd',
  LiquidateCollateralFactor = 'liquidateCollateralFactor',
  LiquidationFactor = 'liquidationFactor',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  PriceFeed = 'priceFeed',
  SupplyCap = 'supplyCap',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLastPriceBlockNumber = 'token__lastPriceBlockNumber',
  TokenLastPriceUsd = 'token__lastPriceUsd',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol'
}

export type DailyMarketAccounting = {
  __typename?: 'DailyMarketAccounting';
  /** Accounting snapshot */
  accounting: MarketAccounting;
  /** Days since unix epoch */
  day: Scalars['BigInt']['output'];
  /** Market ID + day */
  id: Scalars['Bytes']['output'];
  /** Market the accounting is for */
  market: Market;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type DailyMarketAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<MarketAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<DailyMarketAccounting_Filter>>>;
  day?: InputMaybe<Scalars['BigInt']['input']>;
  day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  day_not?: InputMaybe<Scalars['BigInt']['input']>;
  day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<DailyMarketAccounting_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum DailyMarketAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingBaseBorrowIndex = 'accounting__baseBorrowIndex',
  AccountingBaseReserveBalance = 'accounting__baseReserveBalance',
  AccountingBaseReserveBalanceUsd = 'accounting__baseReserveBalanceUsd',
  AccountingBaseSupplyIndex = 'accounting__baseSupplyIndex',
  AccountingBorrowApr = 'accounting__borrowApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastAccountingUpdatedBlockNumber = 'accounting__lastAccountingUpdatedBlockNumber',
  AccountingLastAccrualTime = 'accounting__lastAccrualTime',
  AccountingNetBorrowApr = 'accounting__netBorrowApr',
  AccountingNetSupplyApr = 'accounting__netSupplyApr',
  AccountingRewardBorrowApr = 'accounting__rewardBorrowApr',
  AccountingRewardSupplyApr = 'accounting__rewardSupplyApr',
  AccountingSupplyApr = 'accounting__supplyApr',
  AccountingTotalBaseBorrow = 'accounting__totalBaseBorrow',
  AccountingTotalBaseBorrowUsd = 'accounting__totalBaseBorrowUsd',
  AccountingTotalBasePrincipalBorrow = 'accounting__totalBasePrincipalBorrow',
  AccountingTotalBasePrincipalSupply = 'accounting__totalBasePrincipalSupply',
  AccountingTotalBaseSupply = 'accounting__totalBaseSupply',
  AccountingTotalBaseSupplyUsd = 'accounting__totalBaseSupplyUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTrackingBorrowIndex = 'accounting__trackingBorrowIndex',
  AccountingTrackingSupplyIndex = 'accounting__trackingSupplyIndex',
  AccountingUtilization = 'accounting__utilization',
  Day = 'day',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp'
}

export type DailyProtocolAccounting = {
  __typename?: 'DailyProtocolAccounting';
  /** Accounting snapshot */
  accounting: ProtocolAccounting;
  /** Days since unix epoch */
  day: Scalars['BigInt']['output'];
  /** Day */
  id: Scalars['Bytes']['output'];
  /** Protocol the accounting is for */
  protocol: Protocol;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type DailyProtocolAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<ProtocolAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<DailyProtocolAccounting_Filter>>>;
  day?: InputMaybe<Scalars['BigInt']['input']>;
  day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  day_not?: InputMaybe<Scalars['BigInt']['input']>;
  day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DailyProtocolAccounting_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum DailyProtocolAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingAvgBorrowApr = 'accounting__avgBorrowApr',
  AccountingAvgNetBorrowApr = 'accounting__avgNetBorrowApr',
  AccountingAvgNetSupplyApr = 'accounting__avgNetSupplyApr',
  AccountingAvgRewardBorrowApr = 'accounting__avgRewardBorrowApr',
  AccountingAvgRewardSupplyApr = 'accounting__avgRewardSupplyApr',
  AccountingAvgSupplyApr = 'accounting__avgSupplyApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlock = 'accounting__lastUpdatedBlock',
  AccountingReserveBalanceUsd = 'accounting__reserveBalanceUsd',
  AccountingTotalBorrowUsd = 'accounting__totalBorrowUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTotalSupplyUsd = 'accounting__totalSupplyUsd',
  AccountingUtilization = 'accounting__utilization',
  Day = 'day',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  Timestamp = 'timestamp'
}

export type HourlyMarketAccounting = {
  __typename?: 'HourlyMarketAccounting';
  /** Accounting snapshot */
  accounting: MarketAccounting;
  /** Hours since unix epoch */
  hour: Scalars['BigInt']['output'];
  /** Market ID + hour */
  id: Scalars['Bytes']['output'];
  /** Market the accounting if for */
  market: Market;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type HourlyMarketAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<MarketAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<HourlyMarketAccounting_Filter>>>;
  hour?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hour_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<HourlyMarketAccounting_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum HourlyMarketAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingBaseBorrowIndex = 'accounting__baseBorrowIndex',
  AccountingBaseReserveBalance = 'accounting__baseReserveBalance',
  AccountingBaseReserveBalanceUsd = 'accounting__baseReserveBalanceUsd',
  AccountingBaseSupplyIndex = 'accounting__baseSupplyIndex',
  AccountingBorrowApr = 'accounting__borrowApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastAccountingUpdatedBlockNumber = 'accounting__lastAccountingUpdatedBlockNumber',
  AccountingLastAccrualTime = 'accounting__lastAccrualTime',
  AccountingNetBorrowApr = 'accounting__netBorrowApr',
  AccountingNetSupplyApr = 'accounting__netSupplyApr',
  AccountingRewardBorrowApr = 'accounting__rewardBorrowApr',
  AccountingRewardSupplyApr = 'accounting__rewardSupplyApr',
  AccountingSupplyApr = 'accounting__supplyApr',
  AccountingTotalBaseBorrow = 'accounting__totalBaseBorrow',
  AccountingTotalBaseBorrowUsd = 'accounting__totalBaseBorrowUsd',
  AccountingTotalBasePrincipalBorrow = 'accounting__totalBasePrincipalBorrow',
  AccountingTotalBasePrincipalSupply = 'accounting__totalBasePrincipalSupply',
  AccountingTotalBaseSupply = 'accounting__totalBaseSupply',
  AccountingTotalBaseSupplyUsd = 'accounting__totalBaseSupplyUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTrackingBorrowIndex = 'accounting__trackingBorrowIndex',
  AccountingTrackingSupplyIndex = 'accounting__trackingSupplyIndex',
  AccountingUtilization = 'accounting__utilization',
  Hour = 'hour',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp'
}

export type HourlyProtocolAccounting = {
  __typename?: 'HourlyProtocolAccounting';
  /** Accounting snapshot */
  accounting: ProtocolAccounting;
  /** Hours since unix epoch */
  hour: Scalars['BigInt']['output'];
  /** Hour */
  id: Scalars['Bytes']['output'];
  /** Protocol the accounting is for */
  protocol: Protocol;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type HourlyProtocolAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<ProtocolAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<HourlyProtocolAccounting_Filter>>>;
  hour?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hour_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<HourlyProtocolAccounting_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum HourlyProtocolAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingAvgBorrowApr = 'accounting__avgBorrowApr',
  AccountingAvgNetBorrowApr = 'accounting__avgNetBorrowApr',
  AccountingAvgNetSupplyApr = 'accounting__avgNetSupplyApr',
  AccountingAvgRewardBorrowApr = 'accounting__avgRewardBorrowApr',
  AccountingAvgRewardSupplyApr = 'accounting__avgRewardSupplyApr',
  AccountingAvgSupplyApr = 'accounting__avgSupplyApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlock = 'accounting__lastUpdatedBlock',
  AccountingReserveBalanceUsd = 'accounting__reserveBalanceUsd',
  AccountingTotalBorrowUsd = 'accounting__totalBorrowUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTotalSupplyUsd = 'accounting__totalSupplyUsd',
  AccountingUtilization = 'accounting__utilization',
  Hour = 'hour',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  Timestamp = 'timestamp'
}

export type Market = {
  __typename?: 'Market';
  /** All interactions where a collateral asset was absorbed by the market during a liquidation */
  absorbCollateralInteractions: Array<AbsorbCollateralInteraction>;
  /** All interactions where a position was liquidated in this market */
  absorbDebtInteractions: Array<AbsorbDebtInteraction>;
  /** Current accounting of this market */
  accounting: MarketAccounting;
  /** All interactions where a collateral asset was bought using base assets in this market */
  buyCollateralInteractions: Array<BuyCollateralInteraction>;
  /** Current collateral balances of this market */
  collateralBalances: Array<MarketCollateralBalance>;
  /** Comet proxy address */
  cometProxy: Scalars['Bytes']['output'];
  /** Current configuration of this market */
  configuration: MarketConfiguration;
  /** Historical snapshots of market configuration changes, these only get taken on a config change (not periodically) */
  configurationSnapshots: Array<MarketConfigurationSnapshot>;
  /** Block number the market was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Current cumulative usage of this market */
  cumulativeUsage: Usage;
  /** Historical snapshots of daily market accounting */
  dailyMarketAccounting: Array<DailyMarketAccounting>;
  /** Historical snapshots of daily market usage */
  dailyUsage: Array<MarketDailyUsage>;
  /** Historical snapshots of hourly market accounting */
  hourlyMarketAccounting: Array<HourlyMarketAccounting>;
  /** Historical snapshots of hourly market usage */
  hourlyUsage: Array<MarketHourlyUsage>;
  /** Comet proxy address */
  id: Scalars['Bytes']['output'];
  /** Current positions in this market */
  positions: Array<Position>;
  /** Protocol this market is part of */
  protocol: Protocol;
  /** All interactions where the base asset was supplied to this market, including those repaying loans */
  supplyBaseInteractions: Array<SupplyBaseInteraction>;
  /** All interactions where a collateral asset was supplied to this market */
  supplyCollateralInteractions: Array<SupplyCollateralInteraction>;
  /** All interactions where a collateral asset was transferred in this market */
  transferCollateralInteractions: Array<TransferCollateralInteraction>;
  /** Historical snapshots of weekly market accounting */
  weeklyMarketAccounting: Array<WeeklyMarketAccounting>;
  /** All interactions where the base asset was withdraw from this market, including those taking loans */
  withdrawBaseInteractions: Array<WithdrawBaseInteraction>;
  /** All interactions where a collateral asset was withdrawn from this market */
  withdrawCollateralInteractions: Array<WithdrawCollateralInteraction>;
  /** All interactions where reserves were withdrawn from this market */
  withdrawReservesInteractions: Array<WithdrawReservesInteraction>;
};


export type MarketAbsorbCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbCollateralInteraction_Filter>;
};


export type MarketAbsorbDebtInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbDebtInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbDebtInteraction_Filter>;
};


export type MarketBuyCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuyCollateralInteraction_Filter>;
};


export type MarketCollateralBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MarketCollateralBalance_Filter>;
};


export type MarketConfigurationSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketConfigurationSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MarketConfigurationSnapshot_Filter>;
};


export type MarketDailyMarketAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DailyMarketAccounting_Filter>;
};


export type MarketDailyUsageArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MarketDailyUsage_Filter>;
};


export type MarketHourlyMarketAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HourlyMarketAccounting_Filter>;
};


export type MarketHourlyUsageArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MarketHourlyUsage_Filter>;
};


export type MarketPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Position_Filter>;
};


export type MarketSupplyBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyBaseInteraction_Filter>;
};


export type MarketSupplyCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyCollateralInteraction_Filter>;
};


export type MarketTransferCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type MarketWeeklyMarketAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WeeklyMarketAccounting_Filter>;
};


export type MarketWithdrawBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawBaseInteraction_Filter>;
};


export type MarketWithdrawCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};


export type MarketWithdrawReservesInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawReservesInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export type MarketAccounting = {
  __typename?: 'MarketAccounting';
  /** Base supply index, this tracks protocol borrow borrow and monotonically increases */
  baseBorrowIndex: Scalars['BigInt']['output'];
  /** Base asset reserve balance */
  baseReserveBalance: Scalars['BigInt']['output'];
  /** Base asset reserve balance of te market in USD */
  baseReserveBalanceUsd: Scalars['BigDecimal']['output'];
  /** Base supply index, this tracks protocol supply interest and monotonically increases */
  baseSupplyIndex: Scalars['BigInt']['output'];
  /** Base borrow APR of the market */
  borrowApr: Scalars['BigDecimal']['output'];
  /** Total collateral balance in USD */
  collateralBalanceUsd: Scalars['BigDecimal']['output'];
  /** Total collateral reserve balance in USD */
  collateralReservesBalanceUsd: Scalars['BigDecimal']['output'];
  /** Collateralization percent of the protocol (totalBaseSupplyUsd / totalBaseBorrowUsd, or 1 / utilization) */
  collateralization: Scalars['BigDecimal']['output'];
  /** Market ID + hour number for snapshots */
  id: Scalars['Bytes']['output'];
  /** Last block the accounting was updated */
  lastAccountingUpdatedBlockNumber: Scalars['BigInt']['output'];
  /** Last time the market accrued interest (i.e indices changed) */
  lastAccrualTime: Scalars['BigInt']['output'];
  /** Market the accounting is for */
  market: Market;
  /** Net borrow APR of the market (borrowApr - rewardBorrowApr) */
  netBorrowApr: Scalars['BigDecimal']['output'];
  /** Net supply APR of the market (supplyApr + rewardSupplyApr) */
  netSupplyApr: Scalars['BigDecimal']['output'];
  /** Reward borrow APR of the market */
  rewardBorrowApr: Scalars['BigDecimal']['output'];
  /** Reward supply APR of the market */
  rewardSupplyApr: Scalars['BigDecimal']['output'];
  /** Base supply APR of the market */
  supplyApr: Scalars['BigDecimal']['output'];
  /** Total amount of base borrowed from the market (present value) */
  totalBaseBorrow: Scalars['BigInt']['output'];
  /** Total amount of base borrowed from the market in USD */
  totalBaseBorrowUsd: Scalars['BigDecimal']['output'];
  /** Total base principal borrowed from the market, this can be used to construct the most accurate totalBorrow in the case where indices changes haven't been picked up by the subgraph (can accrue without an event) */
  totalBasePrincipalBorrow: Scalars['BigInt']['output'];
  /** Total base principal supplied to the market, this can be used to construct the most accurate totalSupply in the case where indices changes haven't been picked up by the subgraph (can accrue without an event) */
  totalBasePrincipalSupply: Scalars['BigInt']['output'];
  /** Total amount of base supplied to the market (present value) */
  totalBaseSupply: Scalars['BigInt']['output'];
  /** Total amount of base supplied to the market in USD */
  totalBaseSupplyUsd: Scalars['BigDecimal']['output'];
  /** Total reserve balance in USD (collateral + base) */
  totalReserveBalanceUsd: Scalars['BigDecimal']['output'];
  /** Tracking borrow index for borrow rewards */
  trackingBorrowIndex: Scalars['BigInt']['output'];
  /** Tracking supply index for supply rewards */
  trackingSupplyIndex: Scalars['BigInt']['output'];
  /** Utilization percent of the market (totalBaseBorrowUsd / totalBaseSupplyUsd) */
  utilization: Scalars['BigDecimal']['output'];
};

export type MarketAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketAccounting_Filter>>>;
  baseBorrowIndex?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseBorrowIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseReserveBalance?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseReserveBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseReserveBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseReserveBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseReserveBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalance_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseReserveBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseSupplyIndex?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseSupplyIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseSupplyIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralReservesBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralReservesBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralization?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralization_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastAccountingUpdatedBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastAccountingUpdatedBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccountingUpdatedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastAccrualTime?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastAccrualTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastAccrualTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  netBorrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  netBorrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  netBorrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  netSupplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  netSupplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  netSupplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MarketAccounting_Filter>>>;
  rewardBorrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rewardBorrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardBorrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rewardSupplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  rewardSupplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  rewardSupplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBaseBorrow?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrowUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBaseBorrowUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseBorrowUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBaseBorrow_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrow_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrow_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBaseBorrow_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrow_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrow_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseBorrow_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBasePrincipalBorrow?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBasePrincipalBorrow_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalBorrow_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBasePrincipalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBasePrincipalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBasePrincipalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBaseSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupplyUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBaseSupplyUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBaseSupplyUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBaseSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBaseSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBaseSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalReserveBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReserveBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  trackingBorrowIndex?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trackingBorrowIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  trackingBorrowIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trackingSupplyIndex?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trackingSupplyIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  trackingSupplyIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  utilization?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  utilization_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum MarketAccounting_OrderBy {
  BaseBorrowIndex = 'baseBorrowIndex',
  BaseReserveBalance = 'baseReserveBalance',
  BaseReserveBalanceUsd = 'baseReserveBalanceUsd',
  BaseSupplyIndex = 'baseSupplyIndex',
  BorrowApr = 'borrowApr',
  CollateralBalanceUsd = 'collateralBalanceUsd',
  CollateralReservesBalanceUsd = 'collateralReservesBalanceUsd',
  Collateralization = 'collateralization',
  Id = 'id',
  LastAccountingUpdatedBlockNumber = 'lastAccountingUpdatedBlockNumber',
  LastAccrualTime = 'lastAccrualTime',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  NetBorrowApr = 'netBorrowApr',
  NetSupplyApr = 'netSupplyApr',
  RewardBorrowApr = 'rewardBorrowApr',
  RewardSupplyApr = 'rewardSupplyApr',
  SupplyApr = 'supplyApr',
  TotalBaseBorrow = 'totalBaseBorrow',
  TotalBaseBorrowUsd = 'totalBaseBorrowUsd',
  TotalBasePrincipalBorrow = 'totalBasePrincipalBorrow',
  TotalBasePrincipalSupply = 'totalBasePrincipalSupply',
  TotalBaseSupply = 'totalBaseSupply',
  TotalBaseSupplyUsd = 'totalBaseSupplyUsd',
  TotalReserveBalanceUsd = 'totalReserveBalanceUsd',
  TrackingBorrowIndex = 'trackingBorrowIndex',
  TrackingSupplyIndex = 'trackingSupplyIndex',
  Utilization = 'utilization'
}

export type MarketCollateralBalance = CollateralBalance & {
  __typename?: 'MarketCollateralBalance';
  /** Balance of collateralToken */
  balance: Scalars['BigInt']['output'];
  /** Balance in USD of the collateral token */
  balanceUsd: Scalars['BigDecimal']['output'];
  /** Collateral token the balance is for */
  collateralToken: CollateralToken;
  /** Block number when this balance was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Collateral token ID + 'BAL' */
  id: Scalars['Bytes']['output'];
  /** Last block number the balances and reserves were updated */
  lastUpdateBlockNumber: Scalars['BigInt']['output'];
  /** Market balance is for */
  market: Market;
  /** Reserves of the collateral token */
  reserves: Scalars['BigInt']['output'];
  /** Reserves in USD of the collateral token */
  reservesUsd: Scalars['BigDecimal']['output'];
};

export type MarketCollateralBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketCollateralBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralToken?: InputMaybe<Scalars['String']['input']>;
  collateralToken_?: InputMaybe<CollateralToken_Filter>;
  collateralToken_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_lt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_lte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketCollateralBalance_Filter>>>;
  reserves?: InputMaybe<Scalars['BigInt']['input']>;
  reservesUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reservesUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reservesUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserves_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserves_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum MarketCollateralBalance_OrderBy {
  Balance = 'balance',
  BalanceUsd = 'balanceUsd',
  CollateralToken = 'collateralToken',
  CollateralTokenBorrowCollateralFactor = 'collateralToken__borrowCollateralFactor',
  CollateralTokenCreationBlockNumber = 'collateralToken__creationBlockNumber',
  CollateralTokenId = 'collateralToken__id',
  CollateralTokenLastConfigUpdateBlockNumber = 'collateralToken__lastConfigUpdateBlockNumber',
  CollateralTokenLastPriceBlockNumber = 'collateralToken__lastPriceBlockNumber',
  CollateralTokenLastPriceUsd = 'collateralToken__lastPriceUsd',
  CollateralTokenLiquidateCollateralFactor = 'collateralToken__liquidateCollateralFactor',
  CollateralTokenLiquidationFactor = 'collateralToken__liquidationFactor',
  CollateralTokenPriceFeed = 'collateralToken__priceFeed',
  CollateralTokenSupplyCap = 'collateralToken__supplyCap',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  LastUpdateBlockNumber = 'lastUpdateBlockNumber',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Reserves = 'reserves',
  ReservesUsd = 'reservesUsd'
}

export type MarketConfiguration = {
  __typename?: 'MarketConfiguration';
  /** Smallest amount of base that can be borrowed */
  baseBorrowMin: Scalars['BigInt']['output'];
  /** Minimum base asset in market before rewards will accrue */
  baseMinForRewards: Scalars['BigInt']['output'];
  /** Base tokens for the market */
  baseToken: BaseToken;
  /** Base tracking borrow speed for rewards */
  baseTrackingBorrowSpeed: Scalars['BigInt']['output'];
  /** Base tracking supply speed for rewards */
  baseTrackingSupplySpeed: Scalars['BigInt']['output'];
  /** Borrow rate model utilization kink in percent */
  borrowKink: Scalars['BigDecimal']['output'];
  /** Base for the borrow rate model */
  borrowPerSecondInterestRateBase: Scalars['BigInt']['output'];
  /** Slope of the borrow rate model when the utilization is above the borrow kink */
  borrowPerSecondInterestRateSlopeHigh: Scalars['BigInt']['output'];
  /** Slope of the borrow rate model when the utilization is below the borrow kink */
  borrowPerSecondInterestRateSlopeLow: Scalars['BigInt']['output'];
  /** List of collateral tokens for the market */
  collateralTokens: Array<CollateralToken>;
  /** Comet implementation that the market proxy points to */
  cometImplementation?: Maybe<Scalars['Bytes']['output']>;
  /** Comet extension delegate for the market */
  extensionDelegate: Scalars['Bytes']['output'];
  /** Factory contract address for the market */
  factory: Scalars['Bytes']['output'];
  /** Governor of the market */
  governor: Scalars['Bytes']['output'];
  /** Market proxy address or block number + log index for snapshots */
  id: Scalars['Bytes']['output'];
  /** Last block that this configuration was updated */
  lastConfigurationUpdateBlockNumber: Scalars['BigInt']['output'];
  /** Market to configuration is for */
  market: Market;
  /** Name of the market */
  name: Scalars['String']['output'];
  /** Pause guardian for the market */
  pauseGuardian: Scalars['Bytes']['output'];
  /** Store front factor used to compute the discount factor for liquidations */
  storeFrontPriceFactor: Scalars['BigInt']['output'];
  /** Supply rate model utilization kink in percent */
  supplyKink: Scalars['BigDecimal']['output'];
  /** Base for the supply rate model */
  supplyPerSecondInterestRateBase: Scalars['BigInt']['output'];
  /** Slope of the supply rate model when the utilization is above the supply kink */
  supplyPerSecondInterestRateSlopeHigh: Scalars['BigInt']['output'];
  /** Slope of the supply rate model when the utilization is below the supply kink */
  supplyPerSecondInterestRateSlopeLow: Scalars['BigInt']['output'];
  /** Symbol for the ERC20 that market represents */
  symbol: Scalars['String']['output'];
  /** Target base reserves for the market, when reserve drop below collateral reserves become for sale to bring base reserves above this */
  targetReserves: Scalars['BigInt']['output'];
  /** Tracking index scale */
  trackingIndexScale: Scalars['BigInt']['output'];
};


export type MarketConfigurationCollateralTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollateralToken_Filter>;
};

export type MarketConfigurationSnapshot = {
  __typename?: 'MarketConfigurationSnapshot';
  /** Configuration snapshot */
  configuration: MarketConfiguration;
  /** Block number + log index. Note config snapshots are only taken when config changes, not periodically */
  id: Scalars['Bytes']['output'];
  /** Market the config is for */
  market: Market;
  /** Timestamp in seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type MarketConfigurationSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketConfigurationSnapshot_Filter>>>;
  configuration?: InputMaybe<Scalars['String']['input']>;
  configuration_?: InputMaybe<MarketConfiguration_Filter>;
  configuration_contains?: InputMaybe<Scalars['String']['input']>;
  configuration_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_ends_with?: InputMaybe<Scalars['String']['input']>;
  configuration_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_gt?: InputMaybe<Scalars['String']['input']>;
  configuration_gte?: InputMaybe<Scalars['String']['input']>;
  configuration_in?: InputMaybe<Array<Scalars['String']['input']>>;
  configuration_lt?: InputMaybe<Scalars['String']['input']>;
  configuration_lte?: InputMaybe<Scalars['String']['input']>;
  configuration_not?: InputMaybe<Scalars['String']['input']>;
  configuration_not_contains?: InputMaybe<Scalars['String']['input']>;
  configuration_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  configuration_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  configuration_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  configuration_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_starts_with?: InputMaybe<Scalars['String']['input']>;
  configuration_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketConfigurationSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum MarketConfigurationSnapshot_OrderBy {
  Configuration = 'configuration',
  ConfigurationBaseBorrowMin = 'configuration__baseBorrowMin',
  ConfigurationBaseMinForRewards = 'configuration__baseMinForRewards',
  ConfigurationBaseTrackingBorrowSpeed = 'configuration__baseTrackingBorrowSpeed',
  ConfigurationBaseTrackingSupplySpeed = 'configuration__baseTrackingSupplySpeed',
  ConfigurationBorrowKink = 'configuration__borrowKink',
  ConfigurationBorrowPerSecondInterestRateBase = 'configuration__borrowPerSecondInterestRateBase',
  ConfigurationBorrowPerSecondInterestRateSlopeHigh = 'configuration__borrowPerSecondInterestRateSlopeHigh',
  ConfigurationBorrowPerSecondInterestRateSlopeLow = 'configuration__borrowPerSecondInterestRateSlopeLow',
  ConfigurationCometImplementation = 'configuration__cometImplementation',
  ConfigurationExtensionDelegate = 'configuration__extensionDelegate',
  ConfigurationFactory = 'configuration__factory',
  ConfigurationGovernor = 'configuration__governor',
  ConfigurationId = 'configuration__id',
  ConfigurationLastConfigurationUpdateBlockNumber = 'configuration__lastConfigurationUpdateBlockNumber',
  ConfigurationName = 'configuration__name',
  ConfigurationPauseGuardian = 'configuration__pauseGuardian',
  ConfigurationStoreFrontPriceFactor = 'configuration__storeFrontPriceFactor',
  ConfigurationSupplyKink = 'configuration__supplyKink',
  ConfigurationSupplyPerSecondInterestRateBase = 'configuration__supplyPerSecondInterestRateBase',
  ConfigurationSupplyPerSecondInterestRateSlopeHigh = 'configuration__supplyPerSecondInterestRateSlopeHigh',
  ConfigurationSupplyPerSecondInterestRateSlopeLow = 'configuration__supplyPerSecondInterestRateSlopeLow',
  ConfigurationSymbol = 'configuration__symbol',
  ConfigurationTargetReserves = 'configuration__targetReserves',
  ConfigurationTrackingIndexScale = 'configuration__trackingIndexScale',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp'
}

export type MarketConfiguration_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketConfiguration_Filter>>>;
  baseBorrowMin?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseBorrowMin_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseBorrowMin_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseMinForRewards?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseMinForRewards_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseMinForRewards_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseToken?: InputMaybe<Scalars['String']['input']>;
  baseToken_?: InputMaybe<BaseToken_Filter>;
  baseToken_contains?: InputMaybe<Scalars['String']['input']>;
  baseToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseToken_gt?: InputMaybe<Scalars['String']['input']>;
  baseToken_gte?: InputMaybe<Scalars['String']['input']>;
  baseToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseToken_lt?: InputMaybe<Scalars['String']['input']>;
  baseToken_lte?: InputMaybe<Scalars['String']['input']>;
  baseToken_not?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseTrackingBorrowSpeed?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingBorrowSpeed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingBorrowSpeed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingSupplySpeed?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingSupplySpeed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingSupplySpeed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowKink?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowKink_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  borrowKink_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  borrowPerSecondInterestRateBase?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_gt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_gte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowPerSecondInterestRateBase_lt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_lte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_not?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateBase_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowPerSecondInterestRateSlopeHigh?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_gt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_gte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowPerSecondInterestRateSlopeHigh_lt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_lte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_not?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeHigh_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowPerSecondInterestRateSlopeLow?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_gt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_gte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  borrowPerSecondInterestRateSlopeLow_lt?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_lte?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_not?: InputMaybe<Scalars['BigInt']['input']>;
  borrowPerSecondInterestRateSlopeLow_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralTokens?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralTokens_?: InputMaybe<CollateralToken_Filter>;
  collateralTokens_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralTokens_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralTokens_not?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralTokens_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  cometImplementation?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  cometImplementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cometImplementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extensionDelegate?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_gt?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_gte?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  extensionDelegate_lt?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_lte?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_not?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  extensionDelegate_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  factory?: InputMaybe<Scalars['Bytes']['input']>;
  factory_contains?: InputMaybe<Scalars['Bytes']['input']>;
  factory_gt?: InputMaybe<Scalars['Bytes']['input']>;
  factory_gte?: InputMaybe<Scalars['Bytes']['input']>;
  factory_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  factory_lt?: InputMaybe<Scalars['Bytes']['input']>;
  factory_lte?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  factory_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  governor?: InputMaybe<Scalars['Bytes']['input']>;
  governor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  governor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  governor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  governor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  governor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  governor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  governor_not?: InputMaybe<Scalars['Bytes']['input']>;
  governor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  governor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastConfigurationUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastConfigurationUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastConfigurationUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketConfiguration_Filter>>>;
  pauseGuardian?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pauseGuardian_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_not?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pauseGuardian_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  storeFrontPriceFactor?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_gt?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_gte?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  storeFrontPriceFactor_lt?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_lte?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_not?: InputMaybe<Scalars['BigInt']['input']>;
  storeFrontPriceFactor_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyKink?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyKink_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  supplyKink_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  supplyPerSecondInterestRateBase?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyPerSecondInterestRateBase_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateBase_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyPerSecondInterestRateSlopeHigh?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyPerSecondInterestRateSlopeHigh_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeHigh_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyPerSecondInterestRateSlopeLow?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyPerSecondInterestRateSlopeLow_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyPerSecondInterestRateSlopeLow_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  targetReserves?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_gt?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_gte?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  targetReserves_lt?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_lte?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_not?: InputMaybe<Scalars['BigInt']['input']>;
  targetReserves_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trackingIndexScale?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_gt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_gte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  trackingIndexScale_lt?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_lte?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_not?: InputMaybe<Scalars['BigInt']['input']>;
  trackingIndexScale_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum MarketConfiguration_OrderBy {
  BaseBorrowMin = 'baseBorrowMin',
  BaseMinForRewards = 'baseMinForRewards',
  BaseToken = 'baseToken',
  BaseTokenCreationBlockNumber = 'baseToken__creationBlockNumber',
  BaseTokenId = 'baseToken__id',
  BaseTokenLastConfigUpdateBlockNumber = 'baseToken__lastConfigUpdateBlockNumber',
  BaseTokenLastPriceBlockNumber = 'baseToken__lastPriceBlockNumber',
  BaseTokenLastPriceUsd = 'baseToken__lastPriceUsd',
  BaseTokenPriceFeed = 'baseToken__priceFeed',
  BaseTrackingBorrowSpeed = 'baseTrackingBorrowSpeed',
  BaseTrackingSupplySpeed = 'baseTrackingSupplySpeed',
  BorrowKink = 'borrowKink',
  BorrowPerSecondInterestRateBase = 'borrowPerSecondInterestRateBase',
  BorrowPerSecondInterestRateSlopeHigh = 'borrowPerSecondInterestRateSlopeHigh',
  BorrowPerSecondInterestRateSlopeLow = 'borrowPerSecondInterestRateSlopeLow',
  CollateralTokens = 'collateralTokens',
  CometImplementation = 'cometImplementation',
  ExtensionDelegate = 'extensionDelegate',
  Factory = 'factory',
  Governor = 'governor',
  Id = 'id',
  LastConfigurationUpdateBlockNumber = 'lastConfigurationUpdateBlockNumber',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Name = 'name',
  PauseGuardian = 'pauseGuardian',
  StoreFrontPriceFactor = 'storeFrontPriceFactor',
  SupplyKink = 'supplyKink',
  SupplyPerSecondInterestRateBase = 'supplyPerSecondInterestRateBase',
  SupplyPerSecondInterestRateSlopeHigh = 'supplyPerSecondInterestRateSlopeHigh',
  SupplyPerSecondInterestRateSlopeLow = 'supplyPerSecondInterestRateSlopeLow',
  Symbol = 'symbol',
  TargetReserves = 'targetReserves',
  TrackingIndexScale = 'trackingIndexScale'
}

export type MarketDailyUsage = {
  __typename?: 'MarketDailyUsage';
  /** Days since unix epoch */
  day: Scalars['BigInt']['output'];
  /** Market ID + day */
  id: Scalars['Bytes']['output'];
  /** Market the usage is for */
  market: Market;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Usage snapshot from that day */
  usage: Usage;
};

export type MarketDailyUsage_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketDailyUsage_Filter>>>;
  day?: InputMaybe<Scalars['BigInt']['input']>;
  day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  day_not?: InputMaybe<Scalars['BigInt']['input']>;
  day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketDailyUsage_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usage?: InputMaybe<Scalars['String']['input']>;
  usage_?: InputMaybe<Usage_Filter>;
  usage_contains?: InputMaybe<Scalars['String']['input']>;
  usage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_gt?: InputMaybe<Scalars['String']['input']>;
  usage_gte?: InputMaybe<Scalars['String']['input']>;
  usage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_lt?: InputMaybe<Scalars['String']['input']>;
  usage_lte?: InputMaybe<Scalars['String']['input']>;
  usage_not?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MarketDailyUsage_OrderBy {
  Day = 'day',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp',
  Usage = 'usage',
  UsageId = 'usage__id',
  UsageInteractionCount = 'usage__interactionCount',
  UsageLiquidationCount = 'usage__liquidationCount',
  UsageSupplyBaseCount = 'usage__supplyBaseCount',
  UsageSupplyCollateralCount = 'usage__supplyCollateralCount',
  UsageTransferCollateralCount = 'usage__transferCollateralCount',
  UsageUniqueUsersCount = 'usage__uniqueUsersCount',
  UsageWithdrawBaseCount = 'usage__withdrawBaseCount',
  UsageWithdrawCollateralCount = 'usage__withdrawCollateralCount'
}

export type MarketHourlyUsage = {
  __typename?: 'MarketHourlyUsage';
  /** Hours since unix epoch */
  hour: Scalars['BigInt']['output'];
  /** Market ID + hour */
  id: Scalars['Bytes']['output'];
  /** Market the usage is for */
  market: Market;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Usage snapshot from that hour */
  usage: Usage;
};

export type MarketHourlyUsage_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketHourlyUsage_Filter>>>;
  hour?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hour_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MarketHourlyUsage_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usage?: InputMaybe<Scalars['String']['input']>;
  usage_?: InputMaybe<Usage_Filter>;
  usage_contains?: InputMaybe<Scalars['String']['input']>;
  usage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_gt?: InputMaybe<Scalars['String']['input']>;
  usage_gte?: InputMaybe<Scalars['String']['input']>;
  usage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_lt?: InputMaybe<Scalars['String']['input']>;
  usage_lte?: InputMaybe<Scalars['String']['input']>;
  usage_not?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MarketHourlyUsage_OrderBy {
  Hour = 'hour',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp',
  Usage = 'usage',
  UsageId = 'usage__id',
  UsageInteractionCount = 'usage__interactionCount',
  UsageLiquidationCount = 'usage__liquidationCount',
  UsageSupplyBaseCount = 'usage__supplyBaseCount',
  UsageSupplyCollateralCount = 'usage__supplyCollateralCount',
  UsageTransferCollateralCount = 'usage__transferCollateralCount',
  UsageUniqueUsersCount = 'usage__uniqueUsersCount',
  UsageWithdrawBaseCount = 'usage__withdrawBaseCount',
  UsageWithdrawCollateralCount = 'usage__withdrawCollateralCount'
}

export type Market_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  absorbCollateralInteractions_?: InputMaybe<AbsorbCollateralInteraction_Filter>;
  absorbDebtInteractions_?: InputMaybe<AbsorbDebtInteraction_Filter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<MarketAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Market_Filter>>>;
  buyCollateralInteractions_?: InputMaybe<BuyCollateralInteraction_Filter>;
  collateralBalances_?: InputMaybe<MarketCollateralBalance_Filter>;
  cometProxy?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  cometProxy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_not?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  cometProxy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  configuration?: InputMaybe<Scalars['String']['input']>;
  configurationSnapshots_?: InputMaybe<MarketConfigurationSnapshot_Filter>;
  configuration_?: InputMaybe<MarketConfiguration_Filter>;
  configuration_contains?: InputMaybe<Scalars['String']['input']>;
  configuration_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_ends_with?: InputMaybe<Scalars['String']['input']>;
  configuration_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_gt?: InputMaybe<Scalars['String']['input']>;
  configuration_gte?: InputMaybe<Scalars['String']['input']>;
  configuration_in?: InputMaybe<Array<Scalars['String']['input']>>;
  configuration_lt?: InputMaybe<Scalars['String']['input']>;
  configuration_lte?: InputMaybe<Scalars['String']['input']>;
  configuration_not?: InputMaybe<Scalars['String']['input']>;
  configuration_not_contains?: InputMaybe<Scalars['String']['input']>;
  configuration_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  configuration_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  configuration_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  configuration_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  configuration_starts_with?: InputMaybe<Scalars['String']['input']>;
  configuration_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cumulativeUsage?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_?: InputMaybe<Usage_Filter>;
  cumulativeUsage_contains?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_ends_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_gt?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_gte?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cumulativeUsage_lt?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_lte?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_contains?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cumulativeUsage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_starts_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dailyMarketAccounting_?: InputMaybe<DailyMarketAccounting_Filter>;
  dailyUsage_?: InputMaybe<MarketDailyUsage_Filter>;
  hourlyMarketAccounting_?: InputMaybe<HourlyMarketAccounting_Filter>;
  hourlyUsage_?: InputMaybe<MarketHourlyUsage_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Market_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplyBaseInteractions_?: InputMaybe<SupplyBaseInteraction_Filter>;
  supplyCollateralInteractions_?: InputMaybe<SupplyCollateralInteraction_Filter>;
  transferCollateralInteractions_?: InputMaybe<TransferCollateralInteraction_Filter>;
  weeklyMarketAccounting_?: InputMaybe<WeeklyMarketAccounting_Filter>;
  withdrawBaseInteractions_?: InputMaybe<WithdrawBaseInteraction_Filter>;
  withdrawCollateralInteractions_?: InputMaybe<WithdrawCollateralInteraction_Filter>;
  withdrawReservesInteractions_?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export enum Market_OrderBy {
  AbsorbCollateralInteractions = 'absorbCollateralInteractions',
  AbsorbDebtInteractions = 'absorbDebtInteractions',
  Accounting = 'accounting',
  AccountingBaseBorrowIndex = 'accounting__baseBorrowIndex',
  AccountingBaseReserveBalance = 'accounting__baseReserveBalance',
  AccountingBaseReserveBalanceUsd = 'accounting__baseReserveBalanceUsd',
  AccountingBaseSupplyIndex = 'accounting__baseSupplyIndex',
  AccountingBorrowApr = 'accounting__borrowApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastAccountingUpdatedBlockNumber = 'accounting__lastAccountingUpdatedBlockNumber',
  AccountingLastAccrualTime = 'accounting__lastAccrualTime',
  AccountingNetBorrowApr = 'accounting__netBorrowApr',
  AccountingNetSupplyApr = 'accounting__netSupplyApr',
  AccountingRewardBorrowApr = 'accounting__rewardBorrowApr',
  AccountingRewardSupplyApr = 'accounting__rewardSupplyApr',
  AccountingSupplyApr = 'accounting__supplyApr',
  AccountingTotalBaseBorrow = 'accounting__totalBaseBorrow',
  AccountingTotalBaseBorrowUsd = 'accounting__totalBaseBorrowUsd',
  AccountingTotalBasePrincipalBorrow = 'accounting__totalBasePrincipalBorrow',
  AccountingTotalBasePrincipalSupply = 'accounting__totalBasePrincipalSupply',
  AccountingTotalBaseSupply = 'accounting__totalBaseSupply',
  AccountingTotalBaseSupplyUsd = 'accounting__totalBaseSupplyUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTrackingBorrowIndex = 'accounting__trackingBorrowIndex',
  AccountingTrackingSupplyIndex = 'accounting__trackingSupplyIndex',
  AccountingUtilization = 'accounting__utilization',
  BuyCollateralInteractions = 'buyCollateralInteractions',
  CollateralBalances = 'collateralBalances',
  CometProxy = 'cometProxy',
  Configuration = 'configuration',
  ConfigurationSnapshots = 'configurationSnapshots',
  ConfigurationBaseBorrowMin = 'configuration__baseBorrowMin',
  ConfigurationBaseMinForRewards = 'configuration__baseMinForRewards',
  ConfigurationBaseTrackingBorrowSpeed = 'configuration__baseTrackingBorrowSpeed',
  ConfigurationBaseTrackingSupplySpeed = 'configuration__baseTrackingSupplySpeed',
  ConfigurationBorrowKink = 'configuration__borrowKink',
  ConfigurationBorrowPerSecondInterestRateBase = 'configuration__borrowPerSecondInterestRateBase',
  ConfigurationBorrowPerSecondInterestRateSlopeHigh = 'configuration__borrowPerSecondInterestRateSlopeHigh',
  ConfigurationBorrowPerSecondInterestRateSlopeLow = 'configuration__borrowPerSecondInterestRateSlopeLow',
  ConfigurationCometImplementation = 'configuration__cometImplementation',
  ConfigurationExtensionDelegate = 'configuration__extensionDelegate',
  ConfigurationFactory = 'configuration__factory',
  ConfigurationGovernor = 'configuration__governor',
  ConfigurationId = 'configuration__id',
  ConfigurationLastConfigurationUpdateBlockNumber = 'configuration__lastConfigurationUpdateBlockNumber',
  ConfigurationName = 'configuration__name',
  ConfigurationPauseGuardian = 'configuration__pauseGuardian',
  ConfigurationStoreFrontPriceFactor = 'configuration__storeFrontPriceFactor',
  ConfigurationSupplyKink = 'configuration__supplyKink',
  ConfigurationSupplyPerSecondInterestRateBase = 'configuration__supplyPerSecondInterestRateBase',
  ConfigurationSupplyPerSecondInterestRateSlopeHigh = 'configuration__supplyPerSecondInterestRateSlopeHigh',
  ConfigurationSupplyPerSecondInterestRateSlopeLow = 'configuration__supplyPerSecondInterestRateSlopeLow',
  ConfigurationSymbol = 'configuration__symbol',
  ConfigurationTargetReserves = 'configuration__targetReserves',
  ConfigurationTrackingIndexScale = 'configuration__trackingIndexScale',
  CreationBlockNumber = 'creationBlockNumber',
  CumulativeUsage = 'cumulativeUsage',
  CumulativeUsageId = 'cumulativeUsage__id',
  CumulativeUsageInteractionCount = 'cumulativeUsage__interactionCount',
  CumulativeUsageLiquidationCount = 'cumulativeUsage__liquidationCount',
  CumulativeUsageSupplyBaseCount = 'cumulativeUsage__supplyBaseCount',
  CumulativeUsageSupplyCollateralCount = 'cumulativeUsage__supplyCollateralCount',
  CumulativeUsageTransferCollateralCount = 'cumulativeUsage__transferCollateralCount',
  CumulativeUsageUniqueUsersCount = 'cumulativeUsage__uniqueUsersCount',
  CumulativeUsageWithdrawBaseCount = 'cumulativeUsage__withdrawBaseCount',
  CumulativeUsageWithdrawCollateralCount = 'cumulativeUsage__withdrawCollateralCount',
  DailyMarketAccounting = 'dailyMarketAccounting',
  DailyUsage = 'dailyUsage',
  HourlyMarketAccounting = 'hourlyMarketAccounting',
  HourlyUsage = 'hourlyUsage',
  Id = 'id',
  Positions = 'positions',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  SupplyBaseInteractions = 'supplyBaseInteractions',
  SupplyCollateralInteractions = 'supplyCollateralInteractions',
  TransferCollateralInteractions = 'transferCollateralInteractions',
  WeeklyMarketAccounting = 'weeklyMarketAccounting',
  WithdrawBaseInteractions = 'withdrawBaseInteractions',
  WithdrawCollateralInteractions = 'withdrawCollateralInteractions',
  WithdrawReservesInteractions = 'withdrawReservesInteractions'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Position = {
  __typename?: 'Position';
  /** All interactions where a collateral asset was absorbed by the market during a liquidation of this position */
  absorbCollateralInteractions: Array<AbsorbCollateralInteraction>;
  /** All interactions where this position was liquidated */
  absorbDebtInteractions: Array<AbsorbDebtInteraction>;
  /** Owner of the position */
  account: Account;
  /** Current accounting of this position */
  accounting: PositionAccounting;
  /** Current collateral balances of this position */
  collateralBalances: Array<PositionCollateralBalance>;
  /** Block number the position was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Market proxy address + owner address */
  id: Scalars['Bytes']['output'];
  /** Market the position is in */
  market: Market;
  /** Historical snapshots of position accounting changes, these only get taken when the position accounting changes (not periodically) */
  positionAccountingSnapshots?: Maybe<Array<PositionAccountingSnapshot>>;
  /** All interactions where the base asset was supplied to this position, including those repaying loans */
  supplyBaseInteractions: Array<SupplyBaseInteraction>;
  /** All interactions where a collateral asset was supplied to this position */
  supplyCollateralInteractions: Array<SupplyCollateralInteraction>;
  /** All interactions where a collateral asset was transferred from this position */
  transferFromCollateralInteractions: Array<TransferCollateralInteraction>;
  /** All interactions where a collateral asset was transferred to this position */
  transferToCollateralInteractions: Array<TransferCollateralInteraction>;
  /** All interactions where the base asset was withdraw from this position, including those taking loans */
  withdrawBaseInteractions: Array<WithdrawBaseInteraction>;
  /** All interactions where a collateral asset was withdrawn from this position */
  withdrawCollateralInteractions: Array<WithdrawCollateralInteraction>;
};


export type PositionAbsorbCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbCollateralInteraction_Filter>;
};


export type PositionAbsorbDebtInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbDebtInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbDebtInteraction_Filter>;
};


export type PositionCollateralBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionCollateralBalance_Filter>;
};


export type PositionPositionAccountingSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionAccountingSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PositionAccountingSnapshot_Filter>;
};


export type PositionSupplyBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyBaseInteraction_Filter>;
};


export type PositionSupplyCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyCollateralInteraction_Filter>;
};


export type PositionTransferFromCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type PositionTransferToCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type PositionWithdrawBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawBaseInteraction_Filter>;
};


export type PositionWithdrawCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};

export type PositionAccounting = {
  __typename?: 'PositionAccounting';
  /** Base balance of the position (from the last time it was updated, use basePrincipal and market indices for most accurate baseBalance) */
  baseBalance: Scalars['BigInt']['output'];
  /** Base balance in USD (+ for supply, - for borrow) */
  baseBalanceUsd: Scalars['BigDecimal']['output'];
  /** Base principal of this position (+ for supply, - for borrow), this can be used to construct the most accurate balance using the market indices since position balances are only updated when the principal changes (supply, borrow, etc) */
  basePrincipal: Scalars['BigInt']['output'];
  /** Base tracking that this position has accrued */
  baseTrackingAccrued: Scalars['BigInt']['output'];
  /** Base tracking index for rewards for the position */
  baseTrackingIndex: Scalars['BigInt']['output'];
  /** Collateral balance of the position in USD */
  collateralBalanceUsd: Scalars['BigDecimal']['output'];
  /** Position ID or block timestamp + log index for snapshots */
  id: Scalars['Bytes']['output'];
  /** Last block number that this accounting was updated */
  lastUpdatedBlockNumber: Scalars['BigInt']['output'];
  /** Position the accounting is for */
  position: Position;
};

export type PositionAccountingSnapshot = {
  __typename?: 'PositionAccountingSnapshot';
  /** Accounting snapshot */
  accounting: PositionAccounting;
  /** Position ID + block number + log index. Note that position snapshots are only taken when the position changes (supply, borrow, liquidate, etc.), not periodically */
  id: Scalars['Bytes']['output'];
  /** Position the accounting is for */
  position: Position;
  /** Timestamp in seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
};

export type PositionAccountingSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<PositionAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<PositionAccountingSnapshot_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PositionAccountingSnapshot_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum PositionAccountingSnapshot_OrderBy {
  Accounting = 'accounting',
  AccountingBaseBalance = 'accounting__baseBalance',
  AccountingBaseBalanceUsd = 'accounting__baseBalanceUsd',
  AccountingBasePrincipal = 'accounting__basePrincipal',
  AccountingBaseTrackingAccrued = 'accounting__baseTrackingAccrued',
  AccountingBaseTrackingIndex = 'accounting__baseTrackingIndex',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlockNumber = 'accounting__lastUpdatedBlockNumber',
  Id = 'id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Timestamp = 'timestamp'
}

export type PositionAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionAccounting_Filter>>>;
  baseBalance?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  baseBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  baseBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalance_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  basePrincipal?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  basePrincipal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_not?: InputMaybe<Scalars['BigInt']['input']>;
  basePrincipal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingAccrued?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingAccrued_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingAccrued_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingIndex?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  baseTrackingIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  baseTrackingIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdatedBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PositionAccounting_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum PositionAccounting_OrderBy {
  BaseBalance = 'baseBalance',
  BaseBalanceUsd = 'baseBalanceUsd',
  BasePrincipal = 'basePrincipal',
  BaseTrackingAccrued = 'baseTrackingAccrued',
  BaseTrackingIndex = 'baseTrackingIndex',
  CollateralBalanceUsd = 'collateralBalanceUsd',
  Id = 'id',
  LastUpdatedBlockNumber = 'lastUpdatedBlockNumber',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id'
}

export type PositionCollateralBalance = CollateralBalance & {
  __typename?: 'PositionCollateralBalance';
  /** Balance of collateralToken */
  balance: Scalars['BigInt']['output'];
  /** Balance in USD of the collateral token */
  balanceUsd: Scalars['BigDecimal']['output'];
  /** Collateral token the balance is for */
  collateralToken: CollateralToken;
  /** Block number the position collateral balance was created */
  creationBlockNumber: Scalars['BigInt']['output'];
  /** Position id + collateral token ID */
  id: Scalars['Bytes']['output'];
  /** Last block number the balances and reserves were updated */
  lastUpdateBlockNumber: Scalars['BigInt']['output'];
  /** Position balance is for */
  position: Position;
};

export type PositionCollateralBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PositionCollateralBalance_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  balanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralToken?: InputMaybe<Scalars['String']['input']>;
  collateralToken_?: InputMaybe<CollateralToken_Filter>;
  collateralToken_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_gte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_lt?: InputMaybe<Scalars['String']['input']>;
  collateralToken_lte?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdateBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdateBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdateBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PositionCollateralBalance_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum PositionCollateralBalance_OrderBy {
  Balance = 'balance',
  BalanceUsd = 'balanceUsd',
  CollateralToken = 'collateralToken',
  CollateralTokenBorrowCollateralFactor = 'collateralToken__borrowCollateralFactor',
  CollateralTokenCreationBlockNumber = 'collateralToken__creationBlockNumber',
  CollateralTokenId = 'collateralToken__id',
  CollateralTokenLastConfigUpdateBlockNumber = 'collateralToken__lastConfigUpdateBlockNumber',
  CollateralTokenLastPriceBlockNumber = 'collateralToken__lastPriceBlockNumber',
  CollateralTokenLastPriceUsd = 'collateralToken__lastPriceUsd',
  CollateralTokenLiquidateCollateralFactor = 'collateralToken__liquidateCollateralFactor',
  CollateralTokenLiquidationFactor = 'collateralToken__liquidationFactor',
  CollateralTokenPriceFeed = 'collateralToken__priceFeed',
  CollateralTokenSupplyCap = 'collateralToken__supplyCap',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  LastUpdateBlockNumber = 'lastUpdateBlockNumber',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id'
}

export type Position_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  absorbCollateralInteractions_?: InputMaybe<AbsorbCollateralInteraction_Filter>;
  absorbDebtInteractions_?: InputMaybe<AbsorbDebtInteraction_Filter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<PositionAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  collateralBalances_?: InputMaybe<PositionCollateralBalance_Filter>;
  creationBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  positionAccountingSnapshots_?: InputMaybe<PositionAccountingSnapshot_Filter>;
  supplyBaseInteractions_?: InputMaybe<SupplyBaseInteraction_Filter>;
  supplyCollateralInteractions_?: InputMaybe<SupplyCollateralInteraction_Filter>;
  transferFromCollateralInteractions_?: InputMaybe<TransferCollateralInteraction_Filter>;
  transferToCollateralInteractions_?: InputMaybe<TransferCollateralInteraction_Filter>;
  withdrawBaseInteractions_?: InputMaybe<WithdrawBaseInteraction_Filter>;
  withdrawCollateralInteractions_?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};

export enum Position_OrderBy {
  AbsorbCollateralInteractions = 'absorbCollateralInteractions',
  AbsorbDebtInteractions = 'absorbDebtInteractions',
  Account = 'account',
  AccountAddress = 'account__address',
  AccountCreationBlockNumber = 'account__creationBlockNumber',
  AccountId = 'account__id',
  Accounting = 'accounting',
  AccountingBaseBalance = 'accounting__baseBalance',
  AccountingBaseBalanceUsd = 'accounting__baseBalanceUsd',
  AccountingBasePrincipal = 'accounting__basePrincipal',
  AccountingBaseTrackingAccrued = 'accounting__baseTrackingAccrued',
  AccountingBaseTrackingIndex = 'accounting__baseTrackingIndex',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlockNumber = 'accounting__lastUpdatedBlockNumber',
  CollateralBalances = 'collateralBalances',
  CreationBlockNumber = 'creationBlockNumber',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  PositionAccountingSnapshots = 'positionAccountingSnapshots',
  SupplyBaseInteractions = 'supplyBaseInteractions',
  SupplyCollateralInteractions = 'supplyCollateralInteractions',
  TransferFromCollateralInteractions = 'transferFromCollateralInteractions',
  TransferToCollateralInteractions = 'transferToCollateralInteractions',
  WithdrawBaseInteractions = 'withdrawBaseInteractions',
  WithdrawCollateralInteractions = 'withdrawCollateralInteractions'
}

export type Protocol = {
  __typename?: 'Protocol';
  /** Current accounting for the whole protocol */
  accounting: ProtocolAccounting;
  /** Current address of the configurator implementation */
  configuratorImplementation?: Maybe<Scalars['Bytes']['output']>;
  /** Configurator proxy address */
  configuratorProxy: Scalars['Bytes']['output'];
  /** Current cumulative usage for the whole protocol */
  cumulativeUsage: Usage;
  /** Historical snapshots of daily protocol accounting */
  dailyProtocolAccounting: Array<DailyProtocolAccounting>;
  /** Historical snapshots of daily protocol usage */
  dailyUsage: Array<ProtocolDailyUsage>;
  /** Historical snapshots of hourly protocol accounting */
  hourlyProtocolAccounting: Array<HourlyProtocolAccounting>;
  /** Historical snapshots of hourly protocol usage */
  hourlyUsage: Array<ProtocolHourlyUsage>;
  /** Configurator proxy address */
  id: Scalars['Bytes']['output'];
  /** Markets that exist in the protocol */
  markets: Array<Market>;
  /** Historical snapshots of weekly protocol accounting */
  weeklyProtocolAccounting: Array<WeeklyProtocolAccounting>;
};


export type ProtocolDailyProtocolAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DailyProtocolAccounting_Filter>;
};


export type ProtocolDailyUsageArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProtocolDailyUsage_Filter>;
};


export type ProtocolHourlyProtocolAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HourlyProtocolAccounting_Filter>;
};


export type ProtocolHourlyUsageArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProtocolHourlyUsage_Filter>;
};


export type ProtocolMarketsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Market_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Market_Filter>;
};


export type ProtocolWeeklyProtocolAccountingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WeeklyProtocolAccounting_Filter>;
};

export type ProtocolAccounting = {
  __typename?: 'ProtocolAccounting';
  /** Average base borrow APR of the protocol (average over all markets) */
  avgBorrowApr: Scalars['BigDecimal']['output'];
  /** Average net borrow APR of the protocol (avgBorrowApr - avgRewardBorrowApr) */
  avgNetBorrowApr: Scalars['BigDecimal']['output'];
  /** Average net supply APR of the protocol (avgSupplyApr + avgRewardSupplyApy) */
  avgNetSupplyApr: Scalars['BigDecimal']['output'];
  /** Average reward borrow APR of the protocol (average over all markets) */
  avgRewardBorrowApr: Scalars['BigDecimal']['output'];
  /** Average reward supply APR of the protocol (average over all markets) */
  avgRewardSupplyApr: Scalars['BigDecimal']['output'];
  /** Average base supply APR of the protocol (average over all markets) */
  avgSupplyApr: Scalars['BigDecimal']['output'];
  /** Total collateral balance in USD of the protocol */
  collateralBalanceUsd: Scalars['BigDecimal']['output'];
  /** Total collateral reserve balance in USD of the protocol */
  collateralReservesBalanceUsd: Scalars['BigDecimal']['output'];
  /** Collateralization percent of the protocol (totalSupplyUsd / totalBorrowUsd, or 1 / utilization) */
  collateralization: Scalars['BigDecimal']['output'];
  /** Protocol ID + hour number for snapshots */
  id: Scalars['Bytes']['output'];
  /** Last block the accounting was updated */
  lastUpdatedBlock: Scalars['BigInt']['output'];
  /** Protocol the accounting is for */
  protocol: Protocol;
  /** Total base assets reserve balance in USD of protocol */
  reserveBalanceUsd: Scalars['BigDecimal']['output'];
  /** Total amount borrowed in USD from the protocol */
  totalBorrowUsd: Scalars['BigDecimal']['output'];
  /** Total reserve balance in USD of the protocol (base reserves + collateral reserves) */
  totalReserveBalanceUsd: Scalars['BigDecimal']['output'];
  /** Total amount supplied in USD to the protocol */
  totalSupplyUsd: Scalars['BigDecimal']['output'];
  /** Utilization percent of the protocol (totalBorrowUsd / totalSupplyUsd) */
  utilization: Scalars['BigDecimal']['output'];
};

export type ProtocolAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolAccounting_Filter>>>;
  avgBorrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgBorrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgBorrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgNetBorrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgNetBorrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetBorrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgNetSupplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgNetSupplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgNetSupplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgRewardBorrowApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgRewardBorrowApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardBorrowApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgRewardSupplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgRewardSupplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgRewardSupplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgSupplyApr?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  avgSupplyApr_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  avgSupplyApr_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralReservesBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralReservesBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralReservesBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralization?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  collateralization_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  collateralization_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdatedBlock?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProtocolAccounting_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reserveBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBorrowUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBorrowUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBorrowUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReserveBalanceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalReserveBalanceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalReserveBalanceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupplyUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupplyUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupplyUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  utilization?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  utilization_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  utilization_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum ProtocolAccounting_OrderBy {
  AvgBorrowApr = 'avgBorrowApr',
  AvgNetBorrowApr = 'avgNetBorrowApr',
  AvgNetSupplyApr = 'avgNetSupplyApr',
  AvgRewardBorrowApr = 'avgRewardBorrowApr',
  AvgRewardSupplyApr = 'avgRewardSupplyApr',
  AvgSupplyApr = 'avgSupplyApr',
  CollateralBalanceUsd = 'collateralBalanceUsd',
  CollateralReservesBalanceUsd = 'collateralReservesBalanceUsd',
  Collateralization = 'collateralization',
  Id = 'id',
  LastUpdatedBlock = 'lastUpdatedBlock',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  ReserveBalanceUsd = 'reserveBalanceUsd',
  TotalBorrowUsd = 'totalBorrowUsd',
  TotalReserveBalanceUsd = 'totalReserveBalanceUsd',
  TotalSupplyUsd = 'totalSupplyUsd',
  Utilization = 'utilization'
}

export type ProtocolDailyUsage = {
  __typename?: 'ProtocolDailyUsage';
  /** Days since unix epoch */
  day: Scalars['BigInt']['output'];
  /** Day */
  id: Scalars['Bytes']['output'];
  /** Protocol the usage is for */
  protocol: Protocol;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Usage snapshot from that day */
  usage: Usage;
};

export type ProtocolDailyUsage_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolDailyUsage_Filter>>>;
  day?: InputMaybe<Scalars['BigInt']['input']>;
  day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  day_not?: InputMaybe<Scalars['BigInt']['input']>;
  day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProtocolDailyUsage_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usage?: InputMaybe<Scalars['String']['input']>;
  usage_?: InputMaybe<Usage_Filter>;
  usage_contains?: InputMaybe<Scalars['String']['input']>;
  usage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_gt?: InputMaybe<Scalars['String']['input']>;
  usage_gte?: InputMaybe<Scalars['String']['input']>;
  usage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_lt?: InputMaybe<Scalars['String']['input']>;
  usage_lte?: InputMaybe<Scalars['String']['input']>;
  usage_not?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ProtocolDailyUsage_OrderBy {
  Day = 'day',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  Timestamp = 'timestamp',
  Usage = 'usage',
  UsageId = 'usage__id',
  UsageInteractionCount = 'usage__interactionCount',
  UsageLiquidationCount = 'usage__liquidationCount',
  UsageSupplyBaseCount = 'usage__supplyBaseCount',
  UsageSupplyCollateralCount = 'usage__supplyCollateralCount',
  UsageTransferCollateralCount = 'usage__transferCollateralCount',
  UsageUniqueUsersCount = 'usage__uniqueUsersCount',
  UsageWithdrawBaseCount = 'usage__withdrawBaseCount',
  UsageWithdrawCollateralCount = 'usage__withdrawCollateralCount'
}

export type ProtocolHourlyUsage = {
  __typename?: 'ProtocolHourlyUsage';
  /** Hours since unix epoch */
  hour: Scalars['BigInt']['output'];
  /** Hour */
  id: Scalars['Bytes']['output'];
  /** Protocol the usage is for */
  protocol: Protocol;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Usage snapshot from that hour */
  usage: Usage;
};

export type ProtocolHourlyUsage_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolHourlyUsage_Filter>>>;
  hour?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hour_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hour_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not?: InputMaybe<Scalars['BigInt']['input']>;
  hour_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProtocolHourlyUsage_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usage?: InputMaybe<Scalars['String']['input']>;
  usage_?: InputMaybe<Usage_Filter>;
  usage_contains?: InputMaybe<Scalars['String']['input']>;
  usage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_gt?: InputMaybe<Scalars['String']['input']>;
  usage_gte?: InputMaybe<Scalars['String']['input']>;
  usage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_lt?: InputMaybe<Scalars['String']['input']>;
  usage_lte?: InputMaybe<Scalars['String']['input']>;
  usage_not?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains?: InputMaybe<Scalars['String']['input']>;
  usage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with?: InputMaybe<Scalars['String']['input']>;
  usage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ProtocolHourlyUsage_OrderBy {
  Hour = 'hour',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  Timestamp = 'timestamp',
  Usage = 'usage',
  UsageId = 'usage__id',
  UsageInteractionCount = 'usage__interactionCount',
  UsageLiquidationCount = 'usage__liquidationCount',
  UsageSupplyBaseCount = 'usage__supplyBaseCount',
  UsageSupplyCollateralCount = 'usage__supplyCollateralCount',
  UsageTransferCollateralCount = 'usage__transferCollateralCount',
  UsageUniqueUsersCount = 'usage__uniqueUsersCount',
  UsageWithdrawBaseCount = 'usage__withdrawBaseCount',
  UsageWithdrawCollateralCount = 'usage__withdrawCollateralCount'
}

export type Protocol_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<ProtocolAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Protocol_Filter>>>;
  configuratorImplementation?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  configuratorImplementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorImplementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  configuratorProxy?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  configuratorProxy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_not?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  configuratorProxy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  cumulativeUsage?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_?: InputMaybe<Usage_Filter>;
  cumulativeUsage_contains?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_ends_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_gt?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_gte?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cumulativeUsage_lt?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_lte?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_contains?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  cumulativeUsage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_starts_with?: InputMaybe<Scalars['String']['input']>;
  cumulativeUsage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dailyProtocolAccounting_?: InputMaybe<DailyProtocolAccounting_Filter>;
  dailyUsage_?: InputMaybe<ProtocolDailyUsage_Filter>;
  hourlyProtocolAccounting_?: InputMaybe<HourlyProtocolAccounting_Filter>;
  hourlyUsage_?: InputMaybe<ProtocolHourlyUsage_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  markets?: InputMaybe<Array<Scalars['String']['input']>>;
  markets_?: InputMaybe<Market_Filter>;
  markets_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  markets_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  markets_not?: InputMaybe<Array<Scalars['String']['input']>>;
  markets_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  markets_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Protocol_Filter>>>;
  weeklyProtocolAccounting_?: InputMaybe<WeeklyProtocolAccounting_Filter>;
};

export enum Protocol_OrderBy {
  Accounting = 'accounting',
  AccountingAvgBorrowApr = 'accounting__avgBorrowApr',
  AccountingAvgNetBorrowApr = 'accounting__avgNetBorrowApr',
  AccountingAvgNetSupplyApr = 'accounting__avgNetSupplyApr',
  AccountingAvgRewardBorrowApr = 'accounting__avgRewardBorrowApr',
  AccountingAvgRewardSupplyApr = 'accounting__avgRewardSupplyApr',
  AccountingAvgSupplyApr = 'accounting__avgSupplyApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlock = 'accounting__lastUpdatedBlock',
  AccountingReserveBalanceUsd = 'accounting__reserveBalanceUsd',
  AccountingTotalBorrowUsd = 'accounting__totalBorrowUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTotalSupplyUsd = 'accounting__totalSupplyUsd',
  AccountingUtilization = 'accounting__utilization',
  ConfiguratorImplementation = 'configuratorImplementation',
  ConfiguratorProxy = 'configuratorProxy',
  CumulativeUsage = 'cumulativeUsage',
  CumulativeUsageId = 'cumulativeUsage__id',
  CumulativeUsageInteractionCount = 'cumulativeUsage__interactionCount',
  CumulativeUsageLiquidationCount = 'cumulativeUsage__liquidationCount',
  CumulativeUsageSupplyBaseCount = 'cumulativeUsage__supplyBaseCount',
  CumulativeUsageSupplyCollateralCount = 'cumulativeUsage__supplyCollateralCount',
  CumulativeUsageTransferCollateralCount = 'cumulativeUsage__transferCollateralCount',
  CumulativeUsageUniqueUsersCount = 'cumulativeUsage__uniqueUsersCount',
  CumulativeUsageWithdrawBaseCount = 'cumulativeUsage__withdrawBaseCount',
  CumulativeUsageWithdrawCollateralCount = 'cumulativeUsage__withdrawCollateralCount',
  DailyProtocolAccounting = 'dailyProtocolAccounting',
  DailyUsage = 'dailyUsage',
  HourlyProtocolAccounting = 'hourlyProtocolAccounting',
  HourlyUsage = 'hourlyUsage',
  Id = 'id',
  Markets = 'markets',
  WeeklyProtocolAccounting = 'weeklyProtocolAccounting'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  absorbCollateralInteraction?: Maybe<AbsorbCollateralInteraction>;
  absorbCollateralInteractions: Array<AbsorbCollateralInteraction>;
  absorbDebtInteraction?: Maybe<AbsorbDebtInteraction>;
  absorbDebtInteractions: Array<AbsorbDebtInteraction>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  activeAccount?: Maybe<_ActiveAccount>;
  activeAccounts: Array<_ActiveAccount>;
  baseToken?: Maybe<BaseToken>;
  baseTokens: Array<BaseToken>;
  buyCollateralInteraction?: Maybe<BuyCollateralInteraction>;
  buyCollateralInteractions: Array<BuyCollateralInteraction>;
  claimRewardsInteraction?: Maybe<ClaimRewardsInteraction>;
  claimRewardsInteractions: Array<ClaimRewardsInteraction>;
  collateralBalance?: Maybe<CollateralBalance>;
  collateralBalances: Array<CollateralBalance>;
  collateralToken?: Maybe<CollateralToken>;
  collateralTokens: Array<CollateralToken>;
  dailyMarketAccounting?: Maybe<DailyMarketAccounting>;
  dailyMarketAccountings: Array<DailyMarketAccounting>;
  dailyProtocolAccounting?: Maybe<DailyProtocolAccounting>;
  dailyProtocolAccountings: Array<DailyProtocolAccounting>;
  hourlyMarketAccounting?: Maybe<HourlyMarketAccounting>;
  hourlyMarketAccountings: Array<HourlyMarketAccounting>;
  hourlyProtocolAccounting?: Maybe<HourlyProtocolAccounting>;
  hourlyProtocolAccountings: Array<HourlyProtocolAccounting>;
  market?: Maybe<Market>;
  marketAccounting?: Maybe<MarketAccounting>;
  marketAccountings: Array<MarketAccounting>;
  marketCollateralBalance?: Maybe<MarketCollateralBalance>;
  marketCollateralBalances: Array<MarketCollateralBalance>;
  marketConfiguration?: Maybe<MarketConfiguration>;
  marketConfigurationSnapshot?: Maybe<MarketConfigurationSnapshot>;
  marketConfigurationSnapshots: Array<MarketConfigurationSnapshot>;
  marketConfigurations: Array<MarketConfiguration>;
  marketDailyUsage?: Maybe<MarketDailyUsage>;
  marketDailyUsages: Array<MarketDailyUsage>;
  marketHourlyUsage?: Maybe<MarketHourlyUsage>;
  marketHourlyUsages: Array<MarketHourlyUsage>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positionAccounting?: Maybe<PositionAccounting>;
  positionAccountingSnapshot?: Maybe<PositionAccountingSnapshot>;
  positionAccountingSnapshots: Array<PositionAccountingSnapshot>;
  positionAccountings: Array<PositionAccounting>;
  positionCollateralBalance?: Maybe<PositionCollateralBalance>;
  positionCollateralBalances: Array<PositionCollateralBalance>;
  positions: Array<Position>;
  protocol?: Maybe<Protocol>;
  protocolAccounting?: Maybe<ProtocolAccounting>;
  protocolAccountings: Array<ProtocolAccounting>;
  protocolDailyUsage?: Maybe<ProtocolDailyUsage>;
  protocolDailyUsages: Array<ProtocolDailyUsage>;
  protocolHourlyUsage?: Maybe<ProtocolHourlyUsage>;
  protocolHourlyUsages: Array<ProtocolHourlyUsage>;
  protocols: Array<Protocol>;
  supplyBaseInteraction?: Maybe<SupplyBaseInteraction>;
  supplyBaseInteractions: Array<SupplyBaseInteraction>;
  supplyCollateralInteraction?: Maybe<SupplyCollateralInteraction>;
  supplyCollateralInteractions: Array<SupplyCollateralInteraction>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transferCollateralInteraction?: Maybe<TransferCollateralInteraction>;
  transferCollateralInteractions: Array<TransferCollateralInteraction>;
  usage?: Maybe<Usage>;
  usages: Array<Usage>;
  weeklyMarketAccounting?: Maybe<WeeklyMarketAccounting>;
  weeklyMarketAccountings: Array<WeeklyMarketAccounting>;
  weeklyProtocolAccounting?: Maybe<WeeklyProtocolAccounting>;
  weeklyProtocolAccountings: Array<WeeklyProtocolAccounting>;
  withdrawBaseInteraction?: Maybe<WithdrawBaseInteraction>;
  withdrawBaseInteractions: Array<WithdrawBaseInteraction>;
  withdrawCollateralInteraction?: Maybe<WithdrawCollateralInteraction>;
  withdrawCollateralInteractions: Array<WithdrawCollateralInteraction>;
  withdrawReservesInteraction?: Maybe<WithdrawReservesInteraction>;
  withdrawReservesInteractions: Array<WithdrawReservesInteraction>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAbsorbCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAbsorbCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbsorbCollateralInteraction_Filter>;
};


export type QueryAbsorbDebtInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAbsorbDebtInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbDebtInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbsorbDebtInteraction_Filter>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryActiveAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryActiveAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_ActiveAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<_ActiveAccount_Filter>;
};


export type QueryBaseTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBaseTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BaseToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BaseToken_Filter>;
};


export type QueryBuyCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBuyCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BuyCollateralInteraction_Filter>;
};


export type QueryClaimRewardsInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryClaimRewardsInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClaimRewardsInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimRewardsInteraction_Filter>;
};


export type QueryCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralBalance_Filter>;
};


export type QueryCollateralTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollateralTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralToken_Filter>;
};


export type QueryDailyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketAccounting_Filter>;
};


export type QueryDailyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyProtocolAccounting_Filter>;
};


export type QueryHourlyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourlyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyMarketAccounting_Filter>;
};


export type QueryHourlyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourlyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyProtocolAccounting_Filter>;
};


export type QueryMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketAccounting_Filter>;
};


export type QueryMarketCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketCollateralBalance_Filter>;
};


export type QueryMarketConfigurationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketConfigurationSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketConfigurationSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketConfigurationSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketConfigurationSnapshot_Filter>;
};


export type QueryMarketConfigurationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketConfiguration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketConfiguration_Filter>;
};


export type QueryMarketDailyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketDailyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketDailyUsage_Filter>;
};


export type QueryMarketHourlyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketHourlyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketHourlyUsage_Filter>;
};


export type QueryMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Market_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Market_Filter>;
};


export type QueryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionAccountingSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionAccountingSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionAccountingSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionAccountingSnapshot_Filter>;
};


export type QueryPositionAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionAccounting_Filter>;
};


export type QueryPositionCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionCollateralBalance_Filter>;
};


export type QueryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};


export type QueryProtocolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolAccounting_Filter>;
};


export type QueryProtocolDailyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolDailyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolDailyUsage_Filter>;
};


export type QueryProtocolHourlyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolHourlyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolHourlyUsage_Filter>;
};


export type QueryProtocolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Protocol_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Protocol_Filter>;
};


export type QuerySupplyBaseInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySupplyBaseInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SupplyBaseInteraction_Filter>;
};


export type QuerySupplyCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySupplyCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SupplyCollateralInteraction_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type QueryTransferCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransferCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type QueryUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Usage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Usage_Filter>;
};


export type QueryWeeklyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWeeklyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyMarketAccounting_Filter>;
};


export type QueryWeeklyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWeeklyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyProtocolAccounting_Filter>;
};


export type QueryWithdrawBaseInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawBaseInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawBaseInteraction_Filter>;
};


export type QueryWithdrawCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};


export type QueryWithdrawReservesInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawReservesInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawReservesInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  absorbCollateralInteraction?: Maybe<AbsorbCollateralInteraction>;
  absorbCollateralInteractions: Array<AbsorbCollateralInteraction>;
  absorbDebtInteraction?: Maybe<AbsorbDebtInteraction>;
  absorbDebtInteractions: Array<AbsorbDebtInteraction>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  activeAccount?: Maybe<_ActiveAccount>;
  activeAccounts: Array<_ActiveAccount>;
  baseToken?: Maybe<BaseToken>;
  baseTokens: Array<BaseToken>;
  buyCollateralInteraction?: Maybe<BuyCollateralInteraction>;
  buyCollateralInteractions: Array<BuyCollateralInteraction>;
  claimRewardsInteraction?: Maybe<ClaimRewardsInteraction>;
  claimRewardsInteractions: Array<ClaimRewardsInteraction>;
  collateralBalance?: Maybe<CollateralBalance>;
  collateralBalances: Array<CollateralBalance>;
  collateralToken?: Maybe<CollateralToken>;
  collateralTokens: Array<CollateralToken>;
  dailyMarketAccounting?: Maybe<DailyMarketAccounting>;
  dailyMarketAccountings: Array<DailyMarketAccounting>;
  dailyProtocolAccounting?: Maybe<DailyProtocolAccounting>;
  dailyProtocolAccountings: Array<DailyProtocolAccounting>;
  hourlyMarketAccounting?: Maybe<HourlyMarketAccounting>;
  hourlyMarketAccountings: Array<HourlyMarketAccounting>;
  hourlyProtocolAccounting?: Maybe<HourlyProtocolAccounting>;
  hourlyProtocolAccountings: Array<HourlyProtocolAccounting>;
  market?: Maybe<Market>;
  marketAccounting?: Maybe<MarketAccounting>;
  marketAccountings: Array<MarketAccounting>;
  marketCollateralBalance?: Maybe<MarketCollateralBalance>;
  marketCollateralBalances: Array<MarketCollateralBalance>;
  marketConfiguration?: Maybe<MarketConfiguration>;
  marketConfigurationSnapshot?: Maybe<MarketConfigurationSnapshot>;
  marketConfigurationSnapshots: Array<MarketConfigurationSnapshot>;
  marketConfigurations: Array<MarketConfiguration>;
  marketDailyUsage?: Maybe<MarketDailyUsage>;
  marketDailyUsages: Array<MarketDailyUsage>;
  marketHourlyUsage?: Maybe<MarketHourlyUsage>;
  marketHourlyUsages: Array<MarketHourlyUsage>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positionAccounting?: Maybe<PositionAccounting>;
  positionAccountingSnapshot?: Maybe<PositionAccountingSnapshot>;
  positionAccountingSnapshots: Array<PositionAccountingSnapshot>;
  positionAccountings: Array<PositionAccounting>;
  positionCollateralBalance?: Maybe<PositionCollateralBalance>;
  positionCollateralBalances: Array<PositionCollateralBalance>;
  positions: Array<Position>;
  protocol?: Maybe<Protocol>;
  protocolAccounting?: Maybe<ProtocolAccounting>;
  protocolAccountings: Array<ProtocolAccounting>;
  protocolDailyUsage?: Maybe<ProtocolDailyUsage>;
  protocolDailyUsages: Array<ProtocolDailyUsage>;
  protocolHourlyUsage?: Maybe<ProtocolHourlyUsage>;
  protocolHourlyUsages: Array<ProtocolHourlyUsage>;
  protocols: Array<Protocol>;
  supplyBaseInteraction?: Maybe<SupplyBaseInteraction>;
  supplyBaseInteractions: Array<SupplyBaseInteraction>;
  supplyCollateralInteraction?: Maybe<SupplyCollateralInteraction>;
  supplyCollateralInteractions: Array<SupplyCollateralInteraction>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transferCollateralInteraction?: Maybe<TransferCollateralInteraction>;
  transferCollateralInteractions: Array<TransferCollateralInteraction>;
  usage?: Maybe<Usage>;
  usages: Array<Usage>;
  weeklyMarketAccounting?: Maybe<WeeklyMarketAccounting>;
  weeklyMarketAccountings: Array<WeeklyMarketAccounting>;
  weeklyProtocolAccounting?: Maybe<WeeklyProtocolAccounting>;
  weeklyProtocolAccountings: Array<WeeklyProtocolAccounting>;
  withdrawBaseInteraction?: Maybe<WithdrawBaseInteraction>;
  withdrawBaseInteractions: Array<WithdrawBaseInteraction>;
  withdrawCollateralInteraction?: Maybe<WithdrawCollateralInteraction>;
  withdrawCollateralInteractions: Array<WithdrawCollateralInteraction>;
  withdrawReservesInteraction?: Maybe<WithdrawReservesInteraction>;
  withdrawReservesInteractions: Array<WithdrawReservesInteraction>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAbsorbCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAbsorbCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbsorbCollateralInteraction_Filter>;
};


export type SubscriptionAbsorbDebtInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAbsorbDebtInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbDebtInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AbsorbDebtInteraction_Filter>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionActiveAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionActiveAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_ActiveAccount_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<_ActiveAccount_Filter>;
};


export type SubscriptionBaseTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBaseTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BaseToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BaseToken_Filter>;
};


export type SubscriptionBuyCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBuyCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BuyCollateralInteraction_Filter>;
};


export type SubscriptionClaimRewardsInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionClaimRewardsInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClaimRewardsInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClaimRewardsInteraction_Filter>;
};


export type SubscriptionCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralBalance_Filter>;
};


export type SubscriptionCollateralTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollateralTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollateralToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollateralToken_Filter>;
};


export type SubscriptionDailyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyMarketAccounting_Filter>;
};


export type SubscriptionDailyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DailyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyProtocolAccounting_Filter>;
};


export type SubscriptionHourlyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourlyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyMarketAccounting_Filter>;
};


export type SubscriptionHourlyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourlyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<HourlyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyProtocolAccounting_Filter>;
};


export type SubscriptionMarketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketAccounting_Filter>;
};


export type SubscriptionMarketCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketCollateralBalance_Filter>;
};


export type SubscriptionMarketConfigurationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketConfigurationSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketConfigurationSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketConfigurationSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketConfigurationSnapshot_Filter>;
};


export type SubscriptionMarketConfigurationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketConfiguration_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketConfiguration_Filter>;
};


export type SubscriptionMarketDailyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketDailyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketDailyUsage_Filter>;
};


export type SubscriptionMarketHourlyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketHourlyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MarketHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MarketHourlyUsage_Filter>;
};


export type SubscriptionMarketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Market_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Market_Filter>;
};


export type SubscriptionPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionAccountingSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionAccountingSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionAccountingSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionAccountingSnapshot_Filter>;
};


export type SubscriptionPositionAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionAccounting_Filter>;
};


export type SubscriptionPositionCollateralBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionCollateralBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PositionCollateralBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PositionCollateralBalance_Filter>;
};


export type SubscriptionPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};


export type SubscriptionProtocolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolAccounting_Filter>;
};


export type SubscriptionProtocolDailyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolDailyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolDailyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolDailyUsage_Filter>;
};


export type SubscriptionProtocolHourlyUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolHourlyUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolHourlyUsage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolHourlyUsage_Filter>;
};


export type SubscriptionProtocolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Protocol_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Protocol_Filter>;
};


export type SubscriptionSupplyBaseInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSupplyBaseInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SupplyBaseInteraction_Filter>;
};


export type SubscriptionSupplyCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSupplyCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SupplyCollateralInteraction_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type SubscriptionTransferCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransferCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type SubscriptionUsageArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsagesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Usage_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Usage_Filter>;
};


export type SubscriptionWeeklyMarketAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWeeklyMarketAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyMarketAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyMarketAccounting_Filter>;
};


export type SubscriptionWeeklyProtocolAccountingArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWeeklyProtocolAccountingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WeeklyProtocolAccounting_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyProtocolAccounting_Filter>;
};


export type SubscriptionWithdrawBaseInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawBaseInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawBaseInteraction_Filter>;
};


export type SubscriptionWithdrawCollateralInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawCollateralInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};


export type SubscriptionWithdrawReservesInteractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawReservesInteractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawReservesInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export type SupplyBaseInteraction = {
  __typename?: 'SupplyBaseInteraction';
  /** Amount being supplied */
  amount: Scalars['BigInt']['output'];
  /** Amount being supplied in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being supplied */
  asset: BaseToken;
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Market the interaction changes */
  position: Position;
  /** Supplied of funds */
  supplier: Scalars['Bytes']['output'];
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type SupplyBaseInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<SupplyBaseInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<BaseToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<SupplyBaseInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_contains?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_gt?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_gte?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  supplier_lt?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_lte?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum SupplyBaseInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetPriceFeed = 'asset__priceFeed',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Supplier = 'supplier',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type SupplyCollateralInteraction = {
  __typename?: 'SupplyCollateralInteraction';
  /** Amount supplied */
  amount: Scalars['BigInt']['output'];
  /** Amount supplied in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being supplied */
  asset: CollateralToken;
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the interaction is with */
  position: Position;
  /** Supplier of the collateral */
  supplier: Scalars['Bytes']['output'];
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type SupplyCollateralInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<SupplyCollateralInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<CollateralToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<SupplyCollateralInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplier?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_contains?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_gt?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_gte?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  supplier_lt?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_lte?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  supplier_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum SupplyCollateralInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetBorrowCollateralFactor = 'asset__borrowCollateralFactor',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetLiquidateCollateralFactor = 'asset__liquidateCollateralFactor',
  AssetLiquidationFactor = 'asset__liquidationFactor',
  AssetPriceFeed = 'asset__priceFeed',
  AssetSupplyCap = 'asset__supplyCap',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Supplier = 'supplier',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type Token = {
  __typename?: 'Token';
  /** Token address */
  address: Scalars['Bytes']['output'];
  /** Token decimals */
  decimals?: Maybe<Scalars['Int']['output']>;
  /** Token address */
  id: Scalars['Bytes']['output'];
  /** Block of the last token price update */
  lastPriceBlockNumber: Scalars['BigInt']['output'];
  /** Last token price in USD */
  lastPriceUsd: Scalars['BigDecimal']['output'];
  /** Token name */
  name: Scalars['String']['output'];
  /** Token symbol */
  symbol: Scalars['String']['output'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastPriceBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastPriceBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastPriceUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  lastPriceUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  lastPriceUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Token_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  Id = 'id',
  LastPriceBlockNumber = 'lastPriceBlockNumber',
  LastPriceUsd = 'lastPriceUsd',
  Name = 'name',
  Symbol = 'symbol'
}

export type Transaction = {
  __typename?: 'Transaction';
  absorbCollateralInteractionCount: Scalars['Int']['output'];
  /** All absorb collateral interaction that were part of this transaction */
  absorbCollateralInteractions: Array<AbsorbCollateralInteraction>;
  absorbDebtInteractionCount: Scalars['Int']['output'];
  /** All absorb debt interaction that were part of this transaction */
  absorbDebtInteractions: Array<AbsorbDebtInteraction>;
  /** Block number transaction is part of */
  blockNumber: Scalars['BigInt']['output'];
  buyCollateralInteractionCount: Scalars['Int']['output'];
  /** All buy collateral interaction that were part of this transaction */
  buyCollateralInteractions: Array<BuyCollateralInteraction>;
  claimRewardsInteractionCount: Scalars['Int']['output'];
  /** All claim rewards interaction that were part of this transaction */
  claimRewardsInteractions: Array<ClaimRewardsInteraction>;
  /** Address the transaction is from */
  from: Scalars['Bytes']['output'];
  /** Gas limit for the transaction */
  gasLimit: Scalars['BigInt']['output'];
  /** Gas price for the transaction */
  gasPrice: Scalars['BigInt']['output'];
  /** Amount of gas used */
  gasUsed?: Maybe<Scalars['BigInt']['output']>;
  /** Amount of gas used in USD */
  gasUsedUsd?: Maybe<Scalars['BigDecimal']['output']>;
  /** Transaction hash */
  hash: Scalars['Bytes']['output'];
  /** Transaction hash */
  id: Scalars['Bytes']['output'];
  supplyBaseInteractionCount: Scalars['Int']['output'];
  /** All supply base interaction that were part of this transaction */
  supplyBaseInteractions: Array<SupplyBaseInteraction>;
  supplyCollateralInteractionCount: Scalars['Int']['output'];
  /** All supply collateral interaction that were part of this transaction */
  supplyCollateralInteractions: Array<SupplyCollateralInteraction>;
  /** Timestamp of the transaction */
  timestamp: Scalars['BigInt']['output'];
  /** Address the transaction is to */
  to?: Maybe<Scalars['Bytes']['output']>;
  transferCollateralInteractionCount: Scalars['Int']['output'];
  /** All transfer collateral interaction that were part of this transaction */
  transferCollateralInteractions: Array<TransferCollateralInteraction>;
  withdrawBaseInteractionCount: Scalars['Int']['output'];
  /** All withdraw base interaction that were part of this transaction */
  withdrawBaseInteractions: Array<WithdrawBaseInteraction>;
  withdrawCollateralInteractionCount: Scalars['Int']['output'];
  /** All withdraw collateral interaction that were part of this transaction */
  withdrawCollateralInteractions: Array<WithdrawCollateralInteraction>;
  withdrawReservesInteractionCount: Scalars['Int']['output'];
  /** All withdraw reserves interaction that were part of this transaction */
  withdrawReservesInteractions: Array<WithdrawReservesInteraction>;
};


export type TransactionAbsorbCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbCollateralInteraction_Filter>;
};


export type TransactionAbsorbDebtInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AbsorbDebtInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbsorbDebtInteraction_Filter>;
};


export type TransactionBuyCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BuyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuyCollateralInteraction_Filter>;
};


export type TransactionClaimRewardsInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClaimRewardsInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ClaimRewardsInteraction_Filter>;
};


export type TransactionSupplyBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyBaseInteraction_Filter>;
};


export type TransactionSupplyCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SupplyCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SupplyCollateralInteraction_Filter>;
};


export type TransactionTransferCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransferCollateralInteraction_Filter>;
};


export type TransactionWithdrawBaseInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawBaseInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawBaseInteraction_Filter>;
};


export type TransactionWithdrawCollateralInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawCollateralInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawCollateralInteraction_Filter>;
};


export type TransactionWithdrawReservesInteractionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WithdrawReservesInteraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  absorbCollateralInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  absorbCollateralInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  absorbCollateralInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  absorbCollateralInteractions_?: InputMaybe<AbsorbCollateralInteraction_Filter>;
  absorbDebtInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  absorbDebtInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  absorbDebtInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  absorbDebtInteractions_?: InputMaybe<AbsorbDebtInteraction_Filter>;
  and?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyCollateralInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  buyCollateralInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  buyCollateralInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  buyCollateralInteractions_?: InputMaybe<BuyCollateralInteraction_Filter>;
  claimRewardsInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  claimRewardsInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  claimRewardsInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  claimRewardsInteractions_?: InputMaybe<ClaimRewardsInteraction_Filter>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsedUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  gasUsedUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  gasUsedUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Transaction_Filter>>>;
  supplyBaseInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  supplyBaseInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  supplyBaseInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  supplyBaseInteractions_?: InputMaybe<SupplyBaseInteraction_Filter>;
  supplyCollateralInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  supplyCollateralInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  supplyCollateralInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  supplyCollateralInteractions_?: InputMaybe<SupplyCollateralInteraction_Filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transferCollateralInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transferCollateralInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  transferCollateralInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transferCollateralInteractions_?: InputMaybe<TransferCollateralInteraction_Filter>;
  withdrawBaseInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawBaseInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  withdrawBaseInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawBaseInteractions_?: InputMaybe<WithdrawBaseInteraction_Filter>;
  withdrawCollateralInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawCollateralInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  withdrawCollateralInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawCollateralInteractions_?: InputMaybe<WithdrawCollateralInteraction_Filter>;
  withdrawReservesInteractionCount?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawReservesInteractionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_not?: InputMaybe<Scalars['Int']['input']>;
  withdrawReservesInteractionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawReservesInteractions_?: InputMaybe<WithdrawReservesInteraction_Filter>;
};

export enum Transaction_OrderBy {
  AbsorbCollateralInteractionCount = 'absorbCollateralInteractionCount',
  AbsorbCollateralInteractions = 'absorbCollateralInteractions',
  AbsorbDebtInteractionCount = 'absorbDebtInteractionCount',
  AbsorbDebtInteractions = 'absorbDebtInteractions',
  BlockNumber = 'blockNumber',
  BuyCollateralInteractionCount = 'buyCollateralInteractionCount',
  BuyCollateralInteractions = 'buyCollateralInteractions',
  ClaimRewardsInteractionCount = 'claimRewardsInteractionCount',
  ClaimRewardsInteractions = 'claimRewardsInteractions',
  From = 'from',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  GasUsedUsd = 'gasUsedUsd',
  Hash = 'hash',
  Id = 'id',
  SupplyBaseInteractionCount = 'supplyBaseInteractionCount',
  SupplyBaseInteractions = 'supplyBaseInteractions',
  SupplyCollateralInteractionCount = 'supplyCollateralInteractionCount',
  SupplyCollateralInteractions = 'supplyCollateralInteractions',
  Timestamp = 'timestamp',
  To = 'to',
  TransferCollateralInteractionCount = 'transferCollateralInteractionCount',
  TransferCollateralInteractions = 'transferCollateralInteractions',
  WithdrawBaseInteractionCount = 'withdrawBaseInteractionCount',
  WithdrawBaseInteractions = 'withdrawBaseInteractions',
  WithdrawCollateralInteractionCount = 'withdrawCollateralInteractionCount',
  WithdrawCollateralInteractions = 'withdrawCollateralInteractions',
  WithdrawReservesInteractionCount = 'withdrawReservesInteractionCount',
  WithdrawReservesInteractions = 'withdrawReservesInteractions'
}

export type TransferCollateralInteraction = {
  __typename?: 'TransferCollateralInteraction';
  /** Amount being transferred */
  amount: Scalars['BigInt']['output'];
  /** Amount being transferred in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being transferred */
  asset: CollateralToken;
  /** Position the transfer is from */
  fromPosition: Position;
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the transfer is to */
  toPosition: Position;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type TransferCollateralInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<TransferCollateralInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<CollateralToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition?: InputMaybe<Scalars['String']['input']>;
  fromPosition_?: InputMaybe<Position_Filter>;
  fromPosition_contains?: InputMaybe<Scalars['String']['input']>;
  fromPosition_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromPosition_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition_gt?: InputMaybe<Scalars['String']['input']>;
  fromPosition_gte?: InputMaybe<Scalars['String']['input']>;
  fromPosition_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromPosition_lt?: InputMaybe<Scalars['String']['input']>;
  fromPosition_lte?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromPosition_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fromPosition_starts_with?: InputMaybe<Scalars['String']['input']>;
  fromPosition_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TransferCollateralInteraction_Filter>>>;
  toPosition?: InputMaybe<Scalars['String']['input']>;
  toPosition_?: InputMaybe<Position_Filter>;
  toPosition_contains?: InputMaybe<Scalars['String']['input']>;
  toPosition_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toPosition_ends_with?: InputMaybe<Scalars['String']['input']>;
  toPosition_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toPosition_gt?: InputMaybe<Scalars['String']['input']>;
  toPosition_gte?: InputMaybe<Scalars['String']['input']>;
  toPosition_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toPosition_lt?: InputMaybe<Scalars['String']['input']>;
  toPosition_lte?: InputMaybe<Scalars['String']['input']>;
  toPosition_not?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toPosition_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  toPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  toPosition_starts_with?: InputMaybe<Scalars['String']['input']>;
  toPosition_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum TransferCollateralInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetBorrowCollateralFactor = 'asset__borrowCollateralFactor',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetLiquidateCollateralFactor = 'asset__liquidateCollateralFactor',
  AssetLiquidationFactor = 'asset__liquidationFactor',
  AssetPriceFeed = 'asset__priceFeed',
  AssetSupplyCap = 'asset__supplyCap',
  FromPosition = 'fromPosition',
  FromPositionCreationBlockNumber = 'fromPosition__creationBlockNumber',
  FromPositionId = 'fromPosition__id',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  ToPosition = 'toPosition',
  ToPositionCreationBlockNumber = 'toPosition__creationBlockNumber',
  ToPositionId = 'toPosition__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type Usage = {
  __typename?: 'Usage';
  /** Name + time qualifier (ex: PROTOCOL_HOUR + hour) */
  id: Scalars['Bytes']['output'];
  /** Number of interactions */
  interactionCount: Scalars['BigInt']['output'];
  /** Number of liquidation interactions */
  liquidationCount: Scalars['BigInt']['output'];
  /** Protocol the usage is for */
  protocol: Protocol;
  /** Number of base supply interactions */
  supplyBaseCount: Scalars['BigInt']['output'];
  /** Number of supply collateral interactions */
  supplyCollateralCount: Scalars['BigInt']['output'];
  /** Number of transfer collateral interactions */
  transferCollateralCount: Scalars['BigInt']['output'];
  /** Number of unique users */
  uniqueUsersCount: Scalars['BigInt']['output'];
  /** Number of base withdraw interactions */
  withdrawBaseCount: Scalars['BigInt']['output'];
  /** Number of withdraw collateral interactions */
  withdrawCollateralCount: Scalars['BigInt']['output'];
};

export type Usage_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Usage_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  interactionCount?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  interactionCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  interactionCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationCount?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidationCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidationCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Usage_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  supplyBaseCount?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyBaseCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyBaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyCollateralCount?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  supplyCollateralCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  supplyCollateralCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferCollateralCount?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transferCollateralCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  transferCollateralCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  uniqueUsersCount?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  uniqueUsersCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  uniqueUsersCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawBaseCount?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawBaseCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawBaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawCollateralCount?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawCollateralCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawCollateralCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Usage_OrderBy {
  Id = 'id',
  InteractionCount = 'interactionCount',
  LiquidationCount = 'liquidationCount',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  SupplyBaseCount = 'supplyBaseCount',
  SupplyCollateralCount = 'supplyCollateralCount',
  TransferCollateralCount = 'transferCollateralCount',
  UniqueUsersCount = 'uniqueUsersCount',
  WithdrawBaseCount = 'withdrawBaseCount',
  WithdrawCollateralCount = 'withdrawCollateralCount'
}

export type WeeklyMarketAccounting = {
  __typename?: 'WeeklyMarketAccounting';
  /** Accounting snapshot */
  accounting: MarketAccounting;
  /** Market ID + week */
  id: Scalars['Bytes']['output'];
  /** Market the accounting if for */
  market: Market;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Weeks since unix epoch */
  week: Scalars['BigInt']['output'];
};

export type WeeklyMarketAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<MarketAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<WeeklyMarketAccounting_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WeeklyMarketAccounting_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  week?: InputMaybe<Scalars['BigInt']['input']>;
  week_gt?: InputMaybe<Scalars['BigInt']['input']>;
  week_gte?: InputMaybe<Scalars['BigInt']['input']>;
  week_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  week_lt?: InputMaybe<Scalars['BigInt']['input']>;
  week_lte?: InputMaybe<Scalars['BigInt']['input']>;
  week_not?: InputMaybe<Scalars['BigInt']['input']>;
  week_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum WeeklyMarketAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingBaseBorrowIndex = 'accounting__baseBorrowIndex',
  AccountingBaseReserveBalance = 'accounting__baseReserveBalance',
  AccountingBaseReserveBalanceUsd = 'accounting__baseReserveBalanceUsd',
  AccountingBaseSupplyIndex = 'accounting__baseSupplyIndex',
  AccountingBorrowApr = 'accounting__borrowApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastAccountingUpdatedBlockNumber = 'accounting__lastAccountingUpdatedBlockNumber',
  AccountingLastAccrualTime = 'accounting__lastAccrualTime',
  AccountingNetBorrowApr = 'accounting__netBorrowApr',
  AccountingNetSupplyApr = 'accounting__netSupplyApr',
  AccountingRewardBorrowApr = 'accounting__rewardBorrowApr',
  AccountingRewardSupplyApr = 'accounting__rewardSupplyApr',
  AccountingSupplyApr = 'accounting__supplyApr',
  AccountingTotalBaseBorrow = 'accounting__totalBaseBorrow',
  AccountingTotalBaseBorrowUsd = 'accounting__totalBaseBorrowUsd',
  AccountingTotalBasePrincipalBorrow = 'accounting__totalBasePrincipalBorrow',
  AccountingTotalBasePrincipalSupply = 'accounting__totalBasePrincipalSupply',
  AccountingTotalBaseSupply = 'accounting__totalBaseSupply',
  AccountingTotalBaseSupplyUsd = 'accounting__totalBaseSupplyUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTrackingBorrowIndex = 'accounting__trackingBorrowIndex',
  AccountingTrackingSupplyIndex = 'accounting__trackingSupplyIndex',
  AccountingUtilization = 'accounting__utilization',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Timestamp = 'timestamp',
  Week = 'week'
}

export type WeeklyProtocolAccounting = {
  __typename?: 'WeeklyProtocolAccounting';
  /** Accounting snapshot */
  accounting: ProtocolAccounting;
  /** Week */
  id: Scalars['Bytes']['output'];
  /** Protocol the accounting if for */
  protocol: Protocol;
  /** Seconds since unix epoch */
  timestamp: Scalars['BigInt']['output'];
  /** Week since unix epoch */
  week: Scalars['BigInt']['output'];
};

export type WeeklyProtocolAccounting_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accounting?: InputMaybe<Scalars['String']['input']>;
  accounting_?: InputMaybe<ProtocolAccounting_Filter>;
  accounting_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_gt?: InputMaybe<Scalars['String']['input']>;
  accounting_gte?: InputMaybe<Scalars['String']['input']>;
  accounting_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_lt?: InputMaybe<Scalars['String']['input']>;
  accounting_lte?: InputMaybe<Scalars['String']['input']>;
  accounting_not?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains?: InputMaybe<Scalars['String']['input']>;
  accounting_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accounting_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with?: InputMaybe<Scalars['String']['input']>;
  accounting_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<WeeklyProtocolAccounting_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WeeklyProtocolAccounting_Filter>>>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  protocol_?: InputMaybe<Protocol_Filter>;
  protocol_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_gt?: InputMaybe<Scalars['String']['input']>;
  protocol_gte?: InputMaybe<Scalars['String']['input']>;
  protocol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_lt?: InputMaybe<Scalars['String']['input']>;
  protocol_lte?: InputMaybe<Scalars['String']['input']>;
  protocol_not?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains?: InputMaybe<Scalars['String']['input']>;
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  protocol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with?: InputMaybe<Scalars['String']['input']>;
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  week?: InputMaybe<Scalars['BigInt']['input']>;
  week_gt?: InputMaybe<Scalars['BigInt']['input']>;
  week_gte?: InputMaybe<Scalars['BigInt']['input']>;
  week_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  week_lt?: InputMaybe<Scalars['BigInt']['input']>;
  week_lte?: InputMaybe<Scalars['BigInt']['input']>;
  week_not?: InputMaybe<Scalars['BigInt']['input']>;
  week_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum WeeklyProtocolAccounting_OrderBy {
  Accounting = 'accounting',
  AccountingAvgBorrowApr = 'accounting__avgBorrowApr',
  AccountingAvgNetBorrowApr = 'accounting__avgNetBorrowApr',
  AccountingAvgNetSupplyApr = 'accounting__avgNetSupplyApr',
  AccountingAvgRewardBorrowApr = 'accounting__avgRewardBorrowApr',
  AccountingAvgRewardSupplyApr = 'accounting__avgRewardSupplyApr',
  AccountingAvgSupplyApr = 'accounting__avgSupplyApr',
  AccountingCollateralBalanceUsd = 'accounting__collateralBalanceUsd',
  AccountingCollateralReservesBalanceUsd = 'accounting__collateralReservesBalanceUsd',
  AccountingCollateralization = 'accounting__collateralization',
  AccountingId = 'accounting__id',
  AccountingLastUpdatedBlock = 'accounting__lastUpdatedBlock',
  AccountingReserveBalanceUsd = 'accounting__reserveBalanceUsd',
  AccountingTotalBorrowUsd = 'accounting__totalBorrowUsd',
  AccountingTotalReserveBalanceUsd = 'accounting__totalReserveBalanceUsd',
  AccountingTotalSupplyUsd = 'accounting__totalSupplyUsd',
  AccountingUtilization = 'accounting__utilization',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolConfiguratorImplementation = 'protocol__configuratorImplementation',
  ProtocolConfiguratorProxy = 'protocol__configuratorProxy',
  ProtocolId = 'protocol__id',
  Timestamp = 'timestamp',
  Week = 'week'
}

export type WithdrawBaseInteraction = {
  __typename?: 'WithdrawBaseInteraction';
  /** Amount being withdrawn */
  amount: Scalars['BigInt']['output'];
  /** Amount being withdrawn in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being withdrawn */
  asset: BaseToken;
  /** Where the funds are being withdrawn to */
  destination: Scalars['Bytes']['output'];
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the interaction is with */
  position: Position;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type WithdrawBaseInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WithdrawBaseInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<BaseToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WithdrawBaseInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WithdrawBaseInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetPriceFeed = 'asset__priceFeed',
  Destination = 'destination',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type WithdrawCollateralInteraction = {
  __typename?: 'WithdrawCollateralInteraction';
  /** Asset being withdrawn */
  amount: Scalars['BigInt']['output'];
  /** Asset being withdrawn in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Asset being withdrawn */
  asset: CollateralToken;
  /** Where the assets are being withdrawn to */
  destination: Scalars['Bytes']['output'];
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Position the interaction is with */
  position: Position;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type WithdrawCollateralInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WithdrawCollateralInteraction_Filter>>>;
  asset?: InputMaybe<Scalars['String']['input']>;
  asset_?: InputMaybe<CollateralToken_Filter>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with?: InputMaybe<Scalars['String']['input']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  destination?: InputMaybe<Scalars['Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WithdrawCollateralInteraction_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WithdrawCollateralInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Asset = 'asset',
  AssetBorrowCollateralFactor = 'asset__borrowCollateralFactor',
  AssetCreationBlockNumber = 'asset__creationBlockNumber',
  AssetId = 'asset__id',
  AssetLastConfigUpdateBlockNumber = 'asset__lastConfigUpdateBlockNumber',
  AssetLastPriceBlockNumber = 'asset__lastPriceBlockNumber',
  AssetLastPriceUsd = 'asset__lastPriceUsd',
  AssetLiquidateCollateralFactor = 'asset__liquidateCollateralFactor',
  AssetLiquidationFactor = 'asset__liquidationFactor',
  AssetPriceFeed = 'asset__priceFeed',
  AssetSupplyCap = 'asset__supplyCap',
  Destination = 'destination',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Position = 'position',
  PositionCreationBlockNumber = 'position__creationBlockNumber',
  PositionId = 'position__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type WithdrawReservesInteraction = {
  __typename?: 'WithdrawReservesInteraction';
  /** Amount of base reserves being withdrawn */
  amount: Scalars['BigInt']['output'];
  /** Amount of base reserves being withdrawn in USD */
  amountUsd: Scalars['BigDecimal']['output'];
  /** Destination of the reserves */
  destination: Scalars['Bytes']['output'];
  /** Transaction ID + event log index */
  id: Scalars['Bytes']['output'];
  /** Market the interaction is with */
  market: Market;
  /** Transaction this interaction is part of */
  transaction: Transaction;
};

export type WithdrawReservesInteraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsd?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountUsd_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WithdrawReservesInteraction_Filter>>>;
  destination?: InputMaybe<Scalars['Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  market?: InputMaybe<Scalars['String']['input']>;
  market_?: InputMaybe<Market_Filter>;
  market_contains?: InputMaybe<Scalars['String']['input']>;
  market_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_gt?: InputMaybe<Scalars['String']['input']>;
  market_gte?: InputMaybe<Scalars['String']['input']>;
  market_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_lt?: InputMaybe<Scalars['String']['input']>;
  market_lte?: InputMaybe<Scalars['String']['input']>;
  market_not?: InputMaybe<Scalars['String']['input']>;
  market_not_contains?: InputMaybe<Scalars['String']['input']>;
  market_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  market_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  market_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  market_starts_with?: InputMaybe<Scalars['String']['input']>;
  market_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WithdrawReservesInteraction_Filter>>>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WithdrawReservesInteraction_OrderBy {
  Amount = 'amount',
  AmountUsd = 'amountUsd',
  Destination = 'destination',
  Id = 'id',
  Market = 'market',
  MarketCometProxy = 'market__cometProxy',
  MarketCreationBlockNumber = 'market__creationBlockNumber',
  MarketId = 'market__id',
  Transaction = 'transaction',
  TransactionAbsorbCollateralInteractionCount = 'transaction__absorbCollateralInteractionCount',
  TransactionAbsorbDebtInteractionCount = 'transaction__absorbDebtInteractionCount',
  TransactionBlockNumber = 'transaction__blockNumber',
  TransactionBuyCollateralInteractionCount = 'transaction__buyCollateralInteractionCount',
  TransactionClaimRewardsInteractionCount = 'transaction__claimRewardsInteractionCount',
  TransactionFrom = 'transaction__from',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionGasUsedUsd = 'transaction__gasUsedUsd',
  TransactionHash = 'transaction__hash',
  TransactionId = 'transaction__id',
  TransactionSupplyBaseInteractionCount = 'transaction__supplyBaseInteractionCount',
  TransactionSupplyCollateralInteractionCount = 'transaction__supplyCollateralInteractionCount',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionTransferCollateralInteractionCount = 'transaction__transferCollateralInteractionCount',
  TransactionWithdrawBaseInteractionCount = 'transaction__withdrawBaseInteractionCount',
  TransactionWithdrawCollateralInteractionCount = 'transaction__withdrawCollateralInteractionCount',
  TransactionWithdrawReservesInteractionCount = 'transaction__withdrawReservesInteractionCount'
}

export type _ActiveAccount = {
  __typename?: '_ActiveAccount';
  /** Address + usecase specific metadata, this is just a helper for tracking overall usage */
  id: Scalars['Bytes']['output'];
};

export type _ActiveAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<_ActiveAccount_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<_ActiveAccount_Filter>>>;
};

export enum _ActiveAccount_OrderBy {
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type MarketByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarketByIdQuery = { __typename?: 'Query', market?: { __typename?: 'Market', cometProxy: any } | null };

export type AllMarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMarketsQuery = { __typename?: 'Query', markets: Array<{ __typename?: 'Market', cometProxy: any, configuration: { __typename?: 'MarketConfiguration', baseToken: { __typename?: 'BaseToken', token: { __typename?: 'Token', name: string, symbol: string, address: any, decimals?: number | null } } }, accounting: { __typename?: 'MarketAccounting', baseSupplyIndex: any, totalBasePrincipalSupply: any, totalBaseSupply: any, totalBaseSupplyUsd: any, lastAccrualTime: any, netSupplyApr: any, rewardSupplyApr: any, supplyApr: any } }> };

export type MarketsByQueryVariables = Exact<{
  where?: InputMaybe<Market_Filter>;
}>;


export type MarketsByQuery = { __typename?: 'Query', markets: Array<{ __typename?: 'Market', cometProxy: any, configuration: { __typename?: 'MarketConfiguration', baseToken: { __typename?: 'BaseToken', token: { __typename?: 'Token', address: any, name: string, symbol: string } } } }> };


export const MarketByIdDocument = gql`
    query MarketByID($id: ID!) {
  market(id: $id) {
    cometProxy
  }
}
    `;
export const AllMarketsDocument = gql`
    query AllMarkets {
  markets {
    cometProxy
    configuration {
      baseToken {
        token {
          name
          symbol
          address
          decimals
        }
      }
    }
    accounting {
      baseSupplyIndex
      totalBasePrincipalSupply
      totalBaseSupply
      totalBaseSupplyUsd
      lastAccrualTime
      netSupplyApr
      rewardSupplyApr
      supplyApr
    }
  }
}
    `;
export const MarketsByDocument = gql`
    query MarketsBy($where: Market_filter) {
  markets(where: $where) {
    cometProxy
    configuration {
      baseToken {
        token {
          address
          name
          symbol
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    MarketByID(variables: MarketByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketByIdQuery>(MarketByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MarketByID', 'query', variables);
    },
    AllMarkets(variables?: AllMarketsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllMarketsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllMarketsQuery>(AllMarketsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllMarkets', 'query', variables);
    },
    MarketsBy(variables?: MarketsByQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarketsByQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketsByQuery>(MarketsByDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MarketsBy', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;