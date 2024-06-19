import { IQueryParams } from '@/common/type';

export type IUserListItem = {
  id: number | string;
  telegramId: number | string;
  telegramUsername: string;
  transactionToday: string; // after format currency with { amount: number; currency: string }
  lastTransactionAt?: Date | string;
  lastClaimAt?: Date | string;
  f1Count: number;
};

export type IUserDetail = {
  id: number;
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
};

export type IUserQueryParams = IQueryParams & {
  parent_id?: number | string;
};

export type IF1UserListItem = {
  id: number | string;
  telegramId: number | string;
  telegramUsername: string;
  transactionToday: string; // after format currency with { amount: number; currency: string }
  lastTransactionAt?: Date | string;
};
