import yup from '@/plugins/yup';

export enum UserDetailSection {
  General = 'general',
  F1 = 'f1'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum UserTransactionType {
  IN = 'in',
  OUT = 'out'
}

export enum ChainType {
  ETHEREUM = 'ethereum',
  SOLANA = 'solana'
}

export const RefundConfigFormSchema = yup.object({
  refunds: yup.array().of(
    yup.object({
      chainType: yup.string().oneOf(Object.values(ChainType)).required().label('refund.chainType'),
      cashbackId: yup.number().integer().positive().required().label('refund.cashbackId')
    })
  )
});
