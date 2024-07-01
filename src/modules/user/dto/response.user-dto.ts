import { Prettify } from '@/common/type';
import { ChainType, UserStatus, UserTransactionType } from '../constant';

export type IUserDTO = {
  id: number | string;
  telegram_id: string;
  telegram_username: string;
  ref_code: string;
  parent_id: number | string;
  tip: number;
  tip_snip: number;
  slippage: number;
  slippage_snip: number;
  buy_custom: number;
  sell_custom: number;
  antimev: string;
  status: UserStatus;
  created_at: Date | string;
  updated_at: Date | string;
};

export type IResponseUserListItemDTO = Prettify<
  IUserDTO & {
    last_claim: Date | string;
    last_transaction: Date | string;
    transaction_today: number;
    f1_count: number;
  }
>;

export type IResponseUserDetailDTO = Prettify<
  IUserDTO & {
    last_claim: Date | string;
  }
>;

export type IResponseF1UserListItemDTO = Prettify<
  Pick<
    IResponseUserListItemDTO,
    'id' | 'telegram_id' | 'telegram_username' | 'last_transaction' | 'transaction_today'
  >
>;

export type IResponseUserRefundDTO = {
  id: number;
  user_id: number;
  chain_type: ChainType;
  cashback_id: number;
  last_claim: Date;
  created_at: Date;
  updated_at: Date;
  cashback_name: string;
  cashback_percent: number;
};

export type IResponseUserTransactionDTO = {
  id: number;
  user_id: number;
  fee: number;
  volumn: number;
  chain_type: ChainType;
  token_address: string;
  tip: number;
  type: UserTransactionType;
  created_at: Date;
};
