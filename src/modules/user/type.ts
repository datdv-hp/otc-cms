import { UserStatus } from './constant';

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
