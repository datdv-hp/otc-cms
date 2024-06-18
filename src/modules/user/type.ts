export type IUserListItem = {
  id: number | string;
  telegramId: number | string;
  tradingVolumeInMonth: string; // after format currency with { amount: number; currency: string }
  lastTradingAt?: Date | string;
  lastCashbackAt?: Date | string;
  f1Count: number;
};
export type IUserDetail = {
  id: number;
  telegramId: string;
  referralId: number | string;
  tip: number | string;
  tipSnip: number | string;
  slippage: number | string;
  slippageSnip: number | string;
  buyCustom: number | string;
  sellCustom: number | string;
  antimev: string;
  lashCashbackAt?: Date;
};
