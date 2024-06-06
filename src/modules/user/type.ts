export type IUser = {
  id: number;
  telegram_id: string;
  telegram_usr: string;
  daily_trading_vol: { amount: number; currency: string };
  monthly_trading_vol: { amount: number; currency: string };
  min_tip: number;
  cashback_id: number;
  last_trading_at: Date;
  last_login_at: Date;
};
