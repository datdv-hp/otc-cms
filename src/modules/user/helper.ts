import { formatCurrenCy, formatDate } from '@/common/helper';
import {
  IResponseF1UserListItemDTO,
  IResponseUserDetailDTO,
  IResponseUserListItemDTO
} from './dto/response.user-dto';
import { IF1UserListItem, IUserDetail, IUserListItem } from './type';

export const toUserListItem = (params: IResponseUserListItemDTO): IUserListItem => {
  return {
    id: params.id,
    telegramId: params.telegram_id,
    telegramUsername: params.telegram_username,
    transactionToday: formatCurrenCy(params.transaction_today),
    lastTransactionAt: formatDate(params.last_transaction),
    lastClaimAt: formatDate(params.last_claim),
    f1Count: params.f1_count,
    status: params.status
  };
};

export const toUserList = (params: IResponseUserListItemDTO[]): IUserListItem[] => {
  return params.map((item) => toUserListItem(item));
};

export const toUserDetail = (params: IResponseUserDetailDTO): IUserDetail => {
  return {
    id: params.id,
    telegramId: params.telegram_id,
    telegramUsername: params.telegram_username,
    referralId: params.parent_id,
    tip: formatCurrenCy(params.tip),
    tipSnip: formatCurrenCy(params.tip_snip),
    slippage: formatCurrenCy(params.slippage),
    slippageSnip: formatCurrenCy(params.slippage_snip),
    buyCustom: formatCurrenCy(params.buy_custom),
    sellCustom: formatCurrenCy(params.sell_custom),
    antimev: formatCurrenCy(params.tip),
    lastClaimAt: formatDate(params.last_claim),
    status: params.status
  };
};

export const toF1UserListItem = (params: IResponseF1UserListItemDTO): IF1UserListItem => {
  return {
    id: params.id,
    telegramId: params.telegram_id,
    telegramUsername: params.telegram_username,
    transactionToday: formatCurrenCy(params.transaction_today),
    lastTransactionAt: formatDate(params.last_transaction)
  };
};

export const toF1UserList = (params: IResponseF1UserListItemDTO[]): IF1UserListItem[] => {
  return params.map((item) => toF1UserListItem(item));
};
