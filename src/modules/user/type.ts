import { ChainType, UserStatus, UserTransactionType } from './constant';

export type IUserListItem = {
  id: number | string;
  telegramId: number | string;
  telegramUsername: string;
  transactionToday: string; // after format currency with { amount: number; currency: string }
  lastTransactionAt?: Date | string;
  lastClaimAt?: Date | string;
  f1Count: number;
  status: UserStatus;
};

export type IUserDetail = {
  id: number | string;
  telegramId: string;
  telegramUsername: string;
  referralId: number | string;
  tip: number | string;
  tipSnip: number | string;
  slippage: number | string;
  slippageSnip: number | string;
  buyCustom: number | string;
  sellCustom: number | string;
  antimev: string;
  lastClaimAt?: Date | string;
  status: UserStatus;
};

export type IF1UserListItem = {
  id: number | string;
  telegramId: number | string;
  telegramUsername: string;
  transactionToday: string; // after format currency with { amount: number; currency: string }
  lastTransactionAt?: Date | string;
};

export type IUserRefund = {
  id: number;
  userId: number;
  chainType: ChainType;
  cashbackId: number;
  lastClaim: Date;
  createdAt: Date;
  updatedAt: Date;
  cashbackName: string;
  cashbackPercent: number;
};
export type IUserRefundItemInForm = {
  chainType: ChainType;
  cashbackId: number;
};

export type IUserTransaction = {
  id: number;
  userId: number;
  fee: number | string;
  volumn: number | string;
  chainType: ChainType;
  tokenAddress: string;
  tip: number | string;
  type: UserTransactionType;
  createdAt: Date | string;
};
