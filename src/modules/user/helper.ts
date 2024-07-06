import { formatCurrenCy, formatDate } from '@/common/helper';
import { IRequestUpdateUserRefundFormDTO } from './dto/request.user-dto';
import {
  IResponseF1UserListItemDTO,
  IResponseUserDetailDTO,
  IResponseUserListItemDTO,
  IResponseUserRefundDTO,
  IResponseUserTransactionDTO
} from './dto/response.user-dto';
import {
  IF1UserListItem,
  IUserDetail,
  IUserListItem,
  IUserRefund,
  IUserRefundItemInForm,
  IUserTransaction
} from './type';

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

export const toUserTransaction = (params: IResponseUserTransactionDTO): IUserTransaction => {
  return {
    id: params.id,
    userId: params.user_id,
    chainType: params.chain_type,
    fee: formatCurrenCy(params.fee),
    tip: formatCurrenCy(params.tip),
    tokenAddress: params.token_address,
    type: params.type,
    volumn: formatCurrenCy(params.volumn),
    createdAt: formatDate(params.created_at)
  };
};

export const toUserTransactionList = (
  params: IResponseUserTransactionDTO[]
): IUserTransaction[] => {
  return params.map(toUserTransaction);
};

export const toUserRefund = (params: IResponseUserRefundDTO): IUserRefund => {
  return {
    id: params.id,
    userId: params.user_id,
    chainType: params.chain_type,
    cashbackId: params.cashback_id,
    lastClaim: params.last_claim,
    createdAt: params.created_at,
    updatedAt: params.updated_at,
    cashbackName: params.cashback_name,
    cashbackPercent: params.cashback_percent
  };
};

export const toUserRefundList = (params: IResponseUserRefundDTO[]): IUserRefund[] => {
  return params.map(toUserRefund);
};
export const toUserRefundFormDTO = (
  params: IUserRefundItemInForm[]
): IRequestUpdateUserRefundFormDTO => {
  return params.map((item) => ({
    chain_type: item.chainType,
    cashback_id: item.cashbackId
  }));
};
