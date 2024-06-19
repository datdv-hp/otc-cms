import { formatCurrenCy, formatDate } from '@/common/helper';
import { IF1UserListItem, IUserDetail, IUserListItem } from './type';

export const toUserListItem = (params: Record<string, unknown>): IUserListItem => {
  return {
    id: params.id as number,
    telegramId: params.telegram_id as string,
    telegramUsername: params.telegram_username as string,
    transactionToday: formatCurrenCy(params.transaction_today as number),
    lastTransactionAt: formatDate(params.last_transaction as Date),
    lastClaimAt: params.last_claim as Date,
    f1Count: params.f1Count as number
  };
};

export const toUserList = (params: Record<string, unknown>[]): IUserListItem[] => {
  return params.map((item) => toUserListItem(item));
};

export const toUserDetail = (params: Record<string, unknown>): IUserDetail => {
  return {
    id: params.id as number,
    telegramId: params.telegram_id as string,
    telegramUsername: params.telegram_username as string,
    referralId: params.parent_id as number,
    tip: formatCurrenCy(params.tip as number),
    tipSnip: formatCurrenCy(params.tip_snip as number),
    slippage: formatCurrenCy(params.slippage as number),
    slippageSnip: formatCurrenCy(params.slippage_snip as number),
    buyCustom: formatCurrenCy(params.buy_custom as number),
    sellCustom: formatCurrenCy(params.sell_custom as number),
    antimev: formatCurrenCy(params.tip as number),
    lastClaimAt: formatDate(params.last_claim as Date)
  };
};

export const toF1UserListItem = (params: Record<string, unknown>): IF1UserListItem => {
  return {
    id: params.id as number,
    telegramId: params.telegram_id as string,
    telegramUsername: params.telegram_username as string,
    transactionToday: formatCurrenCy(params.transaction_today as number),
    lastTransactionAt: formatDate(params.last_transaction as Date)
  };
};

export const toF1UserList = (params: Record<string, unknown>[]): IF1UserListItem[] => {
  return params.map((item) => toF1UserListItem(item));
};
